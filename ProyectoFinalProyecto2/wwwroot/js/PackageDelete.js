
function checkUserRoleForPage(allowedRoles) {
    let userRole = localStorage.getItem("rol");

    console.log(userRole);
    if (userRole === null) {
        showSwalAlert("Error", "No tienes Acceso", "", "error")
        setTimeout(function () {
            window.location.href = '/Home/Home';
        }, 1000);

    }
    if (!allowedRoles.includes(parseInt(userRole, 10))) {
        if (userRole == 1) {
            showSwalAlert("Error", "No tienes Acceso", "", "error")
            setTimeout(function () {
                window.location.href = '/Reportes/Reportes';
            }, 1000);
        } else if (userRole == 3) {
            showSwalAlert("Error", "No tienes Acceso", "", "error")
            setTimeout(function () {
                window.location.href = '/Client/ClientHomePage';
            }, 1000);
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {



    let allowedRolesForPage = [2];

    checkUserRoleForPage(allowedRolesForPage);



});


$(document).ready(function () {
    var currentUrl = window.location.href;
    var id = getLastPartOfUrl(currentUrl);
    $("#services-container").html("");
    if (this.value === "") {
        return
    }
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: API_URL_BASE + "/api/Package/GetServices?idPackage=" + id,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (services) {

            for (let i = 0; i < services.length; i++) {
                let serviceDiv = '<div class="input-container-services">' +
                    '<label class="custom-checkbox">' +
                    '<input name="services-checked" type="checkbox" value="' + services[i].id + '">' +
                    '<span class="checkmark"></span>' +
                    '<span class="text">' + services[i].name + '</span>' +
                    '</label>' +
                    '</div>'

                $("#services-container").append(serviceDiv);
            }
        },
        error: function (error) {
            console.log("error", error)
        }
    });
    $.ajax({

        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204/api/Package/GetPackageById?id=" + id,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (result) {
            let titulo = '<p class="title">' + result[0].packageName + '</p>';
            console.log(titulo);
            $("#name").append(titulo);

        },
        error: function (error) {
            console.log("error", error)
        }
    });


});
function getLastPartOfUrl(url) {
    var parts = url.split('/');
    return parts[parts.length - 1];
}
$("#btn-continue").click(function (e) {
    e.preventDefault();

    let deletedServices = [];
    $("input:checkbox[name=services-checked]:checked").each(function () {
        deletedServices.push(parseInt($(this).val()));
    });

    let id = getLastPartOfUrl(window.location.href);

    // Assuming you have a function to make an AJAX request to insert services into the table
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `${API_URL_BASE}/api/Package/DeleteService?id=${id}`,
        method: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(deletedServices),  // Send only the array directly
        success: function (response) {
            showSwalAlert("Paquete Modificado", '', "/Employee/MenuEmployee")
        },
        error: function (error) {
            console.log('Error inserting services', error);
        }
    });
});