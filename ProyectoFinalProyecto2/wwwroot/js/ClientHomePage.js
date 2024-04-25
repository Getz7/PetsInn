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
$(document).ready(function () {
    showSlides(slideIndex);
})
let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}



const goToReservation = () => {


    window.location.href = '/Client/RegisterReservation'

}

$(document).ready(function () {
    fetch('http://localhost:5204/api/Reservation/GetReservationByUserId?idUser=' + localStorage.getItem("identificationNumber"))
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);
            let plus = '<div class="add-container">' +
                '<a " onClick="goToReservation() "><i class="fa-solid fa-circle-plus"></i></a>' +
                '</div>';
            const cardContainer = $('#reservation-container');
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const enterDate = new Date(item.enterDate);
                    const formattedEnterDate = enterDate.toISOString().split('T')[0];
                   

                   
                    const exitDate = new Date(item.exitDate);
                    const formattedExitDate = exitDate.toISOString().split('T')[0];
                   
                    

                    let card = (
                        '<div class="cards-container">' +
                        '<div class="card-titulo">' +
                        '<h2>' + item.pet.name + '</h2>' +
                        '<i class="fa-solid fa-x"></i>' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<p>Fecha Entrada: ' + formattedEnterDate + '</p>' +
                        '<p>Fecha Salida: ' + formattedExitDate + '</p>' +
                        '<button type="submit" href="#" class="secondary btn">Ver Mas</button>' +
                        '</div>' +
                        '</div>'

                    )

                    cardContainer.append(card);
                });
                cardContainer.append(plus);
                
            }
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


const goToPet = () => {


    window.location.href = '/Client/RegistrarMascota'

}

$(document).ready(function () {
    fetch('http://localhost:5204/api/Reservation/GetPetByUserId?idUser=' + localStorage.getItem("identificationNumber"))
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);

            let plus = '<div class="add-container">' +
                '<a " onClick="goToPet() "><i class="fa-solid fa-circle-plus"></i></a>' +
                '</div>';
            const cardContainer = $('#pets-container');
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const imageUrl = '/Media/lily.jpg';

                    
                    const birthDate = new Date(item.age);
                    const currentDate = new Date();
                    let age = currentDate.getFullYear() - birthDate.getFullYear();

                    
                    const currentMonth = currentDate.getMonth();
                    const birthMonth = birthDate.getMonth();
                    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
                        age--;
                    }

                    let card = (
                        '<div class="mascotas-container">' +
                        '<div class="card-img">' +
                        '<img src="' + imageUrl + '" />' +
                        '</div>' +
                        '<div class="card-mascotas-content">' +
                        '<div class="card-pet-title">' +
                        '<h2>' + item.name + '</h2>' +
                        '</div>' +
                        '<div class="card-pet-info">' +
                        '<p> Edad: ' + age + '</p>' + 
                        '<p>' + item.petType + '</p>' +
                        '<p> Nivel de agresividad: ' + item.aggressiveness + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    )
                    cardContainer.append(card);
                });
                cardContainer.append(plus);
            }
        })

        .catch(error => {
            console.error('Error fetching data:', error);
        });
});




