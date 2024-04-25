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
$(document).ready(function () {
    // Cambia por red
    fetch('http://localhost:5204/Pets/GetAllPets')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


            const table = $('#tablaMascotas');
            if (Array.isArray(data)) {
                data.forEach(item => {

                    const row = $('<tr>');
                    row.append($('<td>').text(item.user.identificationNumber));
                    row.append($('<td>').text(item.name));
                    row.append($('<td>').text(item.description));
                    const age = new Date(item.age);
                    const formattedEnterDate = age.toISOString().split('T')[0];
                   
                    row.append($('<td>').text(formattedEnterDate));
                    row.append($('<td>').text(item.breed));
                    row.append($('<td>').text(item.aggressiveness));
                    
                    table.append(row)
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


const goToEditUser = (e) => {
    console.log("button", e.id)


    window.location.href = '/Admin/UserModify/' + e.id

}
const deleteUser = (e) => {
    console.log("button", e.id)

    $.ajax({

        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204/api/User/DeleteUserById?id=" + e.id,
        method: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (result) {
            console.log(result, "Result")

        },
        error: function (error) {
            console.log("error", error)
        }
    });


}




