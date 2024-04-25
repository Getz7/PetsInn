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
    fetch('http://localhost:5204/api/User/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


            const table = $('#tablaUsuarios');
            if (Array.isArray(data)) {
                data.forEach(item => {
                    
                    const row = $('<tr>');
                    row.append($('<td>').text(item.name));
                    row.append($('<td>').text(item.lastName));
                    row.append($('<td>').text(item.identificationNumber));
                    row.append($('<td>').text(item.identificationType));
                    row.append($('<td>').text(item.email));
                    if (item.idRol === 1) {
                        row.append($('<td>').text("Admin"));
                    } else if (item.idRol === 2) {
                        row.append($('<td>').text("Empleado"));
                    } else if (item.idRol === 3) {
                        row.append($('<td>').text("Cliente"));
                    }
                    const switchInput = $('<label class="switch"> <input type="checkbox" ' + (item.active ? "checked" : "") + '> <span class="slider round"> </span> </label>');

                    switchInput.find('input').on('change', function () {
                        if ($(this).prop('checked')) {
                            console.log('Activado');
                            console.log(item.identificationNumber)
                            $.ajax({
                                headers: {
                                    'Accept': "application/json",
                                    'Content-Type': "application/json"
                                },
                                url: "http://localhost:5204" + "/api/User/ActivateUser?id=" + item.identificationNumber,
                                method: "POST",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                hasContent: true,
                                success: function (data) {
                                    showSwalToast("Usuario activado")
                                },
                                error: function (error) {
                                    console.log(error.errors)
                                }
                            });
                        } else {
                            console.log('Desactivado');
                            console.log(item.identificationNumber)
                            $.ajax({
                                headers: {
                                    'Accept': "application/json",
                                    'Content-Type': "application/json"
                                },
                                url: "http://localhost:5204" + "/api/User/DeactivateUser?id=" + item.identificationNumber,
                                method: "POST",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                hasContent: true,
                                success: function (data) {
                                    showSwalToast("Usuario Desactivado",'','error')
                                },
                                error: function (error) {
                                    console.log(error.errors)
                                }
                            });
                        }
                    });
                    const stateAndEditCell = $('<td id="StateAndEditCell">').append(switchInput)
                    .append(' <button id="' + item.identificationNumber + '" onClick="goToEditUser(this)"> <i class="fa-solid fa-pen-to-square "></i> </i> </button></td> ');
                    row.append(stateAndEditCell);
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

      
   window.location.href = '/Admin/UserModify/'+e.id

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




