
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
        } else if (userRole == 2) {
            showSwalAlert("Error", "No tienes Acceso", "", "error")
            setTimeout(function () {
                window.location.href = '/Employee/MenuEmployee';
            }, 1000);
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {



    let allowedRolesForPage = [3];

    checkUserRoleForPage(allowedRolesForPage);



});


//JS PARA EL CARD
$(document).ready(function () {
    fetch('http://localhost:5204/api/Reservation/GetReservationByUserId?idUser=' + localStorage.getItem("identificationNumber"))
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


         

            

            const cardContainer = $('#pets-container');
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const enterDate = new Date(item.enterDate);
                    const exitDate = new Date(item.exitDate);

                    
                    const options = { month: 'short' };
                    const enterMonth = capitalizeFirstLetter(enterDate.toLocaleString('es-ES', options));
                    const enterDay = enterDate.getDate().toString().padStart(2, '0'); 

                    
                    const exitMonth = capitalizeFirstLetter(exitDate.toLocaleString('es-ES', options));
                    const exitDay = exitDate.getDate().toString().padStart(2, '0'); 

                    const imageUrl = '/Media/lily.jpg';



                    let card = (
                        '<div class="mascotas-container">'+
                            '<div class="card-img">'+
                                '<img src="'+imageUrl+'"/>'+
                            '</div>'+
                            '<div id="card" class="card-mascotas-content">'+
                                '<div class="card-pet-title">'+
                                    '<h2 id="pet-name">'+item.pet.name+'</h2>'+
                        '<div class="dates">' +
                        '<i class="fa-regular fa-calendar"></i><p>' + enterMonth + ' ' + enterDay + '</p>' +
                        '<i class="fa-regular fa-calendar"></i><p>' + exitMonth + ' ' + exitDay + '</p>' +
                                    '</div>'+
                                '</div>'+
                        '<div class="card-pet-info">' +
                        '<p class="pointer" onClick="goToPay('+item.idReservation+')">' + item.state+ '</p>' +
                        '<p>' + item.specialAspects + '</p>' +
                        '<p>' + item.package.packageName + '</p>' +
                                '</div>'+
                            '</div>'+
                        '</div>'
                    )
                    cardContainer.append(card);

                });
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
                
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


//JS PARA TABLA
$(document).ready(function(){
    fetch('http://localhost:5204/api/Reservation/GetDataHistory?idUser=' + localStorage.getItem("identificationNumber"))
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);

            const table = $('#tableReservationsHistory');
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const row = $('<tr>');
                    row.append($('<td>').text(item.pet.name));
                    const enterDate = new Date(item.enterDate);
                    const formattedEnterDate = enterDate.toISOString().split('T')[0];
                    row.append($('<td>').text(formattedEnterDate));

                    
                    const exitDate = new Date(item.exitDate);
                    const formattedExitDate = exitDate.toISOString().split('T')[0];
                    row.append($('<td>').text(formattedExitDate));
                    row.append($('<td>').text(item.specialAspects));
                    
                    row.append($('<td>').text(item.package.packageName));
                    
                    table.append(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}); 

function goToPay(idReservation, state) {
        window.location.href = '../Client/PaymentBill/' + idReservation

}