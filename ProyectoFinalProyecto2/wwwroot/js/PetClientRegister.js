
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
$("#btn-continue").click(function (e) {
    e.preventDefault();
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);


    let age = new Date($("#birthday").val());


    if (age > currentDate) {
        showSwalAlert("Error", "La fecha de nacimiento no puede ser del futuro", "", "error");
        return;
    }
    const pet = {
        name: $("#txt-petName").val(),
        petType: $("#txt-petType").val(),
        description: $("#txt-description").val(),
        age: $("#birthday").val(),
        breed: $("#txt-breed").val(),
        aggressiveness: $("#aggressiveness").val(),
        photo: $("#user-photo-file").val(),
        sex: $('input[name="sex"]:checked').val(),
        user: {
            identificationNumber: localStorage.getItem("identificationNumber")
        },

    }

    if ($("#typeId").val() != "") {
        pet.petGroup = { idGroup: $("#typeId").val() }
    }

    console.log(pet);

    if (checkBlankInputs()) {

        showSwalAlert("Error", "Por favor, llene los campos faltantes", "", "error")

    } else if (verifyPetPhoto()) {

        showSwalAlert("Error", "Por favor suba la foto", "", "error");

    } else {

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
        url: "http://localhost:5204" + "/Pets/CreatePet",
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(pet),
            hasContent: true,
            success: function (data) {
                showSwalAlert("Mascota Registrada", data, "/Client/ClientHomePage")
            },
            error: function (error) {
                console.log(error.errors)
            }
        });
    }
})


function previewImage() {
    var input = document.getElementById('user-photo-file');
    var preview = document.getElementById('user-photo-preview');
    var label = document.getElementById('add-photo-label');

    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
        label.style.display = 'none';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}


function verifyPetPhoto() {

    let photoContainer = $("#user-photo-file")

    if (photoContainer.val() == "") {

        return true;
    }

    return false;
}