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

let coordinates = "";
let mapClickFlag = true;

$("#modifyBtn").click(function (e) {
    e.preventDefault();
    updateUser();
});

$(document).ready(function () {
    var currentUrl = window.location.href;
    var id = getLastPartOfUrl(currentUrl);

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204/api/User/GetUserbyId?id=" + id,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (result) {
            console.log(result, "Result");
            populateLabels(result);
        },
        error: function (error) {
            console.log("error", error);
        }
    });
});

function getLastPartOfUrl(url) {
    var parts = url.split('/');
    return parts[parts.length - 1];
}

function populateLabels(result) {
    console.log("Populating labels with:", result);
    $("#name").val(result[0].name);
    $("#lastname").val(result[0].lastName);
    $("#typeId").val(result[0].identificationType.toLowerCase());
    $("#numeroId").val(result[0].identificationNumber);

    // Set the selected option in the dropdown based on the idRol value
    $("#idRol").val(result[0].idRol);

    $("#email").val(result[0].email);
    $("#address").val(result[0].address);
    console.log("Se actualizaron los inputs");
}

var mymap = L.map('mapid').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);

var marker;

// Añadir el control del buscador al mapa
var geocoder = L.Control.geocoder().addTo(mymap);

// Función para mostrar las coordenadas y agregar marcador al seleccionar un lugar desde el buscador
geocoder.on('markgeocode', function (e) {
    if (mapClickFlag) {
        // Only execute the following code if the click event is from the map, not the geocoder
        if (marker) {
            mymap.removeLayer(marker);
        }

        var latlng = e.geocode.center;
        marker = L.marker(latlng).addTo(mymap);
        marker.bindPopup(e.geocode.name + "<br>Coordenadas: " + latlng.lat.toFixed(6) + ", " + latlng.lng.toFixed(6)).openPopup();

        // Set the coordinates variable
        coordinates = latlng.lat.toFixed(6) + ", " + latlng.lng.toFixed(6);
        console.log(coordinates);
    }
});

// Función para mostrar las coordenadas y agregar marcador al hacer clic en el mapa
function onMapClick(e) {
    if (marker) {
        mymap.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(mymap);
    marker.bindPopup("Coordenadas: " + e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6)).openPopup();

    // Set the coordinates variable
    coordinates = e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6);
    console.log(coordinates);

    coordinates = cordenadas;
    return cordenadas;
}

// Añadir el evento de clic al mapa
mymap.on('click', onMapClick);

// Function to update user data
function updateUser() {
    let user = {};
    var currentUrl = window.location.href;
    var id = getLastPartOfUrl(currentUrl);

    user.email = $("#email").val();
    user.address = coordinates; // Assuming coordinates is defined elsewhere
    user.password = $("#password").val();

    // Get the selected role value (numeric) from the dropdown
    let selectedRol = $("#idRol").val();
    console.log("Selected Role:", selectedRol);

    // Assign the selected role directly to user.idRol
    user.idRol = selectedRol;

    console.log(user);

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204" + "/api/User/UpdateUser?id=" + id,
        method: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(user),
        hasContent: true,
        success: function (data) {
            showSwalAlert("Usuario Modificado", data, "/Admin/UsersList");
        },
        error: function (error) {
            console.log(error.errors);
        }
    });
}

