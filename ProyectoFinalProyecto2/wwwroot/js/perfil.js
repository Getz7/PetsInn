
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

let id = localStorage.getItem("identificationNumber");

$.ajax({
    headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
    },
    url: "http://localhost:5204" + "/api/User/GetUserbyIdNumber?id=" + id,
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    hasContent: true,
    success: function (user) {
        $('#nombreUsuario').text(user.name + " " + user.lastName);
        $('#tipoIdentificacion').text(user.identificationType);
        $('#numeroIdentificacion').text(user.identificationNumber);
        $('#correo').text(user.email);
        $('#direccion').text(user.address);
    },
    error: function (error) {


    }
});

$("#btn-continue").click(function (e) {
    window.location.href = '/cambiarContrasena/cambiarContrasena';
});


function previewImage() {
    var input = document.getElementById('user-photo-file');
    var preview = document.getElementById('user-photo-preview');
    var label = document.getElementById('add-photo-label');

    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

$(document).ready(function () {
    fetch("http://localhost:5204" + "/Pets/GetPetsListbyId?id=" + id)
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);
            const cardContainer = $('#pets-container');
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const birthDate = new Date(item.age);
                    const currentDate = new Date();

                    const imageUrl = '/Media/lily.jpg';

                    let age = currentDate.getFullYear() - birthDate.getFullYear();


                    const currentMonth = currentDate.getMonth();
                    const birthMonth = birthDate.getMonth();
                    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    
                    let card = (
                        '<div class="mascotas-container">' +
                        '<div class="card-mascotas-content">' +
                        '<div class="card-img">' +
                        '<img src="' + imageUrl + '" />' +
                        '</div>' +
                        '<div class="card-pet-title">' +
                        '<h2>' + item.name + '</h2>' +
                        '</div>' +
                        '<div class="card-pet-info">' +
                        '<p> Edad: ' + age + '</p>' +
                        '<p>' + item.petType + '</p>' +
                        '<p>Nivel de agresividad:  ' + item.aggressiveness + '</p>' +
                        '</div>' +
                        '</div>' +
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

let currentIndex = 0;
const totalSlides = document.querySelectorAll('.carousel-item').length;

function showSlide(index) {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const slideWidth = document.querySelector('.carousel-item').clientWidth;
    const newTransformValue = -index * slideWidth + 'px';
    carouselWrapper.style.transform = 'translateX(' + newTransformValue + ')';
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}