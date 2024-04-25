
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
    // Cambia por red
    fetch('http://localhost:5204/api/Group/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


            const table = $('#tableGroups');
            if (Array.isArray(data)) {
                data.forEach(group => {

                    const row = $('<tr>');
                    row.append($('<td>').text(group.idGroup));
                    row.append($('<td>').text(group.petGroupName));
                    row.append($('<td>').text(group.petGroupSize));
                    row.append($('<td>').text(group.petGroupDescription));
                    const stateAndEditCell = $('<td id="StateAndEditCell">').append(' <button id="' + group.idGroup + '" onClick="goToEditGroup(this)"> <i class="fa-solid fa-pen-to-square "></i> </i> </button></td> ');
                    row.append(stateAndEditCell);
                    table.append(row)
                });
            }
            const select = $('#grupoSelect');



            data.forEach(group => {
                const option = $('<option></option>');

                option.text(group.petGroupName);
                option.val(group.idGroup);

                select.append(option);
            });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    fetch('http://localhost:5204/Pets/GetAllPets')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


            const table = $('#tablePets');
            if (Array.isArray(data)) {
                


              
                data.forEach(item => {

                    const row = $('<tr>');
                    row.append($('<td>').text(item.user.identificationNumber));
                    row.append($('<td>').text(item.name));
                    row.append($('<td>').text(item.description));
                    const age = new Date(item.age);
                    const formattedage = age.toISOString().split('T')[0];
                    row.append($('<td>').text(formattedage));
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
const goToEditGroup = (e) => {
    console.log("button", e.id)


    window.location.href = '/Group/GroupConfiguration/' + e.id

}
var typingTimer;                //timer identifier
var doneTypingInterval = 2000;  //time in ms, 2 seconds for example
var $input = $('#id-Client');

//on keyup, start the countdown
$input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
    clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping() {
    console.log('searching')
    if ($("#id-Client").val()) {
        getAndFillUserById();
    }

    //do something
}

function getAndFillUserById() {
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204" + "/api/User/GetUserbyIdNumber?id=" + $("#id-Client").val(),
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (user) {
        

                //get pets by user
                $.ajax({
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    },
                    url: "http://localhost:5204" + "/Pets/GetPetsListbyId?id=" + user.identificationNumber,
                    method: "GET",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    hasContent: true,
                    success: function (pets) {
                        $("#petSelect").html("")
                        pets.forEach((pet) => {
                            $("#petSelect").append('<option value="' + pet.idPet + '">' + pet.name + '</option>')
                        })

                    },
                    error: function (error) {


                    }
                });

        

        },
        error: function (error) {


        }
    });
}

$("#asignBtn").click(function (e) {
   
    e.preventDefault();
    let idGroup = parseInt($('#grupoSelect').val(), 10);
    let idMascota = parseInt($('#petSelect').val(), 10);
    let idCliente = $("#id-Client").val();
    console.log(idMascota, idCliente,idGroup);

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:5204/api/Group/AsignPetGroup?idMascota=${idMascota}&idCliente=${idCliente}&idGroup=${idGroup}`,
        method: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (data) {
            showSwalAlert('Mascota Asignada', '', '/Employee/MenuEmployee');
        },
        error: function (error) {
            console.log(error.errors);
        }
    });
    

       
    
})
