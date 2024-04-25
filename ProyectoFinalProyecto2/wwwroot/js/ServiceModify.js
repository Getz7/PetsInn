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
        if (userRole == 3) {
            showSwalAlert("Error", "No tienes Acceso", "", "error")
            setTimeout(function () {
                window.location.href = '/Client/ClientHomePage';
            }, 1000);
        } else if (userRole == 2) {
            showSwalAlert("Error", "No tienes Acceso", "", "error")
            setTimeout(function () {
                window.location.href = '/Employee/MenuEmployee';
            }, 1000);
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {



    let allowedRolesForPage = [1];

    checkUserRoleForPage(allowedRolesForPage);



});
$("#modifyBtn").click(function (e) {
    e.preventDefault()
    let service = {}
    var currentUrl = window.location.href;
    var id = getLastPartOfUrl(currentUrl);
    service.name = $("#name").val();
    service.description = $("#description").val();
    service.price = $("#price").val();
    console.log(service)

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204" + "/api/Service/UpdateService?id=" + id,
        method: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(service),
        hasContent: true,
        success: function (data) {
            console.log(data)
            showSwalAlert("Servicio Modificado", data, "/Services/ServicesList")
        },
        error: function (error) {
            console.log(error.errors)
        }
    });
});

Inputmask.extendAliases({
    dolar: {
        prefix: "₡",
        groupSeparator: ".",
        alias: "currency",
        placeholder: "0",
        autoGroup: true,
        digits: 0,
        digitsOptional: false,
        clearMaskOnLostFocus: false
    }
});

$(document).ready(function () {
    $("#price").inputmask({ alias: "dolar" });;
   
    var currentUrl = window.location.href;


    var id = getLastPartOfUrl(currentUrl);
   

    console.log("Id:", id);


    $.ajax({

        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204/api/Service/GetServicebyId?id=" + id,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (result) {
            console.log(result, "Result")
            populateLabels(result)
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
function populateLabels(result) {
    console.log("Populating labels with:", result);
    $("#name").val(result[0].name);
    $("#price").val(result[0].price);
    $("#description").val(result[0].description);
}
$("#modifyBtn").click(function (e) {


});