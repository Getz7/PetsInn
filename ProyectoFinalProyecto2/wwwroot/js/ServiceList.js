
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
    fetch('http://localhost:5204/api/Service/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);
            const table = $('#tablaServicios');
            if (Array.isArray(data)) {
                data.forEach(item => {

                    const row = $('<tr>');
                    row.append($('<td>').text(item.id));
                    row.append($('<td>').text(item.name));
                    row.append($('<td>').text(item.description));
                    row.append($('<td>').text(item.price));

                    const switchInput = $('<label class="switch"> <input type="checkbox" ' + (item.available ? "checked" : "") + '> <span class="slider round"> </span> </label>');

                    switchInput.find('input').on('change', function () {
                        if ($(this).prop('checked')) {
                            console.log('Activado');
                            console.log(item.id)
                            $.ajax({
                                headers: {
                                    'Accept': "application/json",
                                    'Content-Type': "application/json"
                                },
                                url: "http://localhost:5204" + "/api/Service/ActivateService?id=" + item.id,
                                method: "POST",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                hasContent: true,
                                success: function (data) {
                                    showSwalToast("Servicio Activado")
                                },
                                error: function (error) {
                                    console.log(error.errors)
                                }
                            });
                        } else {
                            console.log('Desactivado');
                            console.log(item.id)
                            $.ajax({
                                headers: {
                                    'Accept': "application/json",
                                    'Content-Type': "application/json"
                                },
                                url: "http://localhost:5204" + "/api/Service/DeactivateService?id=" + item.id,
                                method: "POST",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                hasContent: true,
                                success: function (data) {
                                    showSwalToast("Servicio Desactivado", '', 'error')
                                },
                                error: function (error) {
                                    console.log(error.errors)
                                }
                            });
                        }
                    });

                    const stateAndEditCell = $('<td id="StateAndEditCell">').append(switchInput)
                    .append(' <button id="' + item.id + '" onClick="goToEditService(this)"> <i class="fa-solid fa-pen-to-square "></i></td>');

                    row.append(stateAndEditCell);
                    table.append(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
const goToEditService = (e) => {
    console.log("button", e.id)


    window.location.href = '/Services/ServiceModify/' + e.id

}

