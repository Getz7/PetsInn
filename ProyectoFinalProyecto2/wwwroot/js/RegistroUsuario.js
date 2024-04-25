let coordinates = ""

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
function isValidEmail(email) {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

$("#btn-continue").click(function (e) {
    e.preventDefault()

    if (checkBlankInputs()) {
        showSwalAlert("Campos incompletos", '', '', 'error')
    } else {
        const email = $("#email").val();

        // Validate email address
        if (!isValidEmail(email)) {
            showSwalAlert("Error", "Por favor, ingrese una dirección de correo electrónico válida", "", "error");
            return;
        }
        let user = {}

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value ?? "";
        let passwordFinal;

        if (password == confirmPassword) {
            passwordFinal = password;
        } else {
            showSwalAlert("Las contraseñas no coinciden", '', '', 'error')
            return;
        }

        user.identificationNumber = $("#id-number").val();
        user.name = $("#txt-name").val();
        user.lastName = $("#txt-lastName").val();
        user.IdentificationType = $("#id-type").val();
        user.Email = $("#email").val();
        user.Address = coordinates;
        user.photo = $("#user-photo-file").val();
        user.idRol = $("#idRol").val();
        user.password = passwordFinal;
        user.active = $("#activo").val();
        user.salt = null;
        console.log(user);

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            url: "http://localhost:5204" + "/api/User/CreateUser",
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(user),
            hasContent: true,
            success: function (data) {
                console.log(data)
                showSwalAlert("Usuario registrado con éxito", "", "/Home/Login");
            },
            error: function (error) {
                console.log(error.errors)
                alert('Por favor, completa todos los campos');
            }
        });
    }
});

$("#continuar").click(function (e) {
    window.location.href = '/Login/Login';
});

var mymap = L.map('mapid').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);

var marker;

// Añadir el control del buscador al mapa
var geocoder = L.Control.geocoder().addTo(mymap);

// Función para mostrar las coordenadas y agregar marcador al seleccionar un lugar desde el buscador
geocoder.on('markgeocode', function (e) {
    if (marker) {
        mymap.removeLayer(marker); // Eliminar el marcador anterior si existe
    }

    var latlng = e.geocode.center;
    marker = L.marker(latlng).addTo(mymap);
    marker.bindPopup(e.geocode.name + "<br>Coordenadas: " + latlng.lat.toFixed(6) + ", " + latlng.lng.toFixed(6)).openPopup();
});

// Función para mostrar las coordenadas y agregar marcador al hacer clic en el mapa
function onMapClick(e) {
    if (marker) {
        mymap.removeLayer(marker); // Eliminar el marcador anterior si existe
    }

    marker = L.marker(e.latlng).addTo(mymap);
    marker.bindPopup("Coordenadas: " + e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6)).openPopup();
    var cordenadas = e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6);
    console.log(cordenadas);

    coordinates = cordenadas;
    return cordenadas;
}

// Añadir el evento de clic al mapa
mymap.on('click', onMapClick);

$('input#id-number').keypress(function (event) {
    const tipo = document.getElementById('id-type').value;

    if (tipo == document.getElementById('cedula').value) {
        if (event.which < 48 || event.which > 57 || this.value.length == 9) {
            return false;
        }
    } else if (tipo == document.getElementById('dimex').value) {
        if (event.which < 48 || event.which > 57 || this.value.length == 12) {
            return false;
        }
    } else if (tipo == document.getElementById('pasaporte').value) {
        if (this.value.length == 9) {
            return false;
        }
    }
});