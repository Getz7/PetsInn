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

    fetch('http://localhost:5204/Pets/GetPetsForSelect')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);
            const select = $('#pets');

          

            data.forEach(pet => {
                const option = $('<option></option>');

                option.text(pet.name);
                option.val(pet.idPet); 
                
                select.append(option);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });



    fetch('http://192.168.0.7:8080/api/Board/GetBoardsAvailable')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);
            const select = $('#boards');
            data.forEach(board => {
                const option = $('<option></option>');

                option.text(board.idPlaca);
                option.val(board.idPlaca); 
                select.append(option);
            });

           
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});

$("#btnAsign").click(function (e) {
    e.preventDefault();
    let idMascota = parseInt($('#pets').val(), 10);
    let idPlaca = $('#boards').val();
    console.log(idMascota, idPlaca);

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://192.168.0.7:8080/api/Board/AsignPetBoard?idMascota=${idMascota}&idPlaca=${idPlaca}`,
        method: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (data) {
            showSwalAlert('Mascota Asignada', '', '/Reportes/Reportes');
        },
        error: function (error) {
            console.log(error.errors);
        }
    });
});
