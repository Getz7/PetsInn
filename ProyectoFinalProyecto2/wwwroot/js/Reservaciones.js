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
// JS POP-UP (NO TOCAR TODAVIA)

//document.addEventListener('DOMContentLoaded', function () {
//    let botonesEliminar = document.querySelectorAll('.eliminate');

//    botonesEliminar.forEach(function (boton) {
//        boton.addEventListener('click', function () {

//            document.getElementById('popup').style.display = 'block';
//            document.getElementById('overlay').style.display = 'block';
//        });
//    });
//    document.querySelector('.cancel').addEventListener('click', function () {
//        document.getElementById('popup').style.display = 'none';
//        document.getElementById('overlay').style.display = 'none';
//    });
//});


// JS PARA LISTAR LAS RESERVAS EN LA TABLA

$(document).ready(function () {
    fetch('http://localhost:5204/api/Reservation/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);

            

            const table = $('#tableReservations');
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const row = $('<tr>');
                    row.append($('<td>').text(item.state));
                    row.append($('<td>').text(item.pet.name));
                    row.append($('<td>').text(item.pet.user.identificationNumber));
                    const enterDate = new Date(item.enterDate);
                    const formattedEnterDate = enterDate.toISOString().split('T')[0];
                    row.append($('<td>').text(formattedEnterDate));

                    // Formatear exitDate
                    const exitDate = new Date(item.exitDate);
                    const formattedExitDate = exitDate.toISOString().split('T')[0];
                    row.append($('<td>').text(formattedExitDate));
                    row.append($('<td>').text(item.specialAspects));
                    table.append(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


//JS PARA FILTRAR POR FECHAS

$("#btn-filtrar").click(function (e) {
    e.preventDefault();
    var initialDate = $("#fechaEntrada").val();
    var finalDate = $("#fechaSalida").val();
    console.log(initialDate);
    console.log(finalDate);
    var apiUrl = 'http://localhost:5204/api/Reservation/GetDataByDate';
    var urlWithParams = `${apiUrl}?initialDate=${encodeURIComponent(initialDate)}&finalDate=${encodeURIComponent(finalDate)}`;
    fetch(urlWithParams)
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API2', data);

            const table = $('#tableReservations');
            table.html('<tr><th>Estado</th ><th>Mascota</th><th>Identificación</th><th>Fecha Entrada</th><th>Fecha Salida</th><th>Aspectos Especiales</th></tr>')
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const row = $('<tr>');
                    row.append($('<td>').text(item.state));
                    row.append($('<td>').text(item.pet.name));
                    row.append($('<td>').text(item.pet.user.identificationNumber));
                    row.append($('<td>').text(item.enterDate));
                    row.append($('<td>').text(item.exitDate));
                    row.append($('<td>').text(item.specialAspects));
                    table.append(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
})