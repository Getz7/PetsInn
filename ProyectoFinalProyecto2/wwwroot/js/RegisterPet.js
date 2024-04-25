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
            identificationNumber: $("#txt-userIdentification").val()
        },
       
    }

    if ($("#typeId").val() != "") {
        pet.petGroup = { idGroup: $("#typeId").val() }
    }

    console.log(pet);

    if (checkBlankInputs()) {
       
        showSwalAlert("Error", "Por favor, llene los campos faltantes", "", "error")

    } else if (verifyPetPhoto()) {

        showSwalAlert("Error","Por favor suba la foto", "", "error");

    }
    else { 

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
                showSwalAlert("Mascota Registrada", data, "/Reportes/PetsList")
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
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

var typingTimer;                //timer identifier
var doneTypingInterval = 2000;  //time in ms, 2 seconds for example
var $input = $('#txt-userIdentification');

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
    if ($("#txt-userIdentification").val()) {
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
        url: "http://localhost:5204" + "/api/User/GetUserbyIdNumber?id=" + $("#txt-userIdentification").val(),
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (user) {
            if (user !== undefined) {
                $("#names").val(user.name)
                $("#last-name").val(user.lastName)

                //get pets by user
               

            } 

        },
        error: function (error) {


        }
    });
}

function loadGroups() {
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204" + "/api/Group/GetData" ,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (groupList) {
            console.log(groupList);
            let groupSelect = $("#typeId");

            groupList.forEach((group) => {
                console.log(group.petGroupName);
                let option = '<option value="' + group.idGroup + '">' + group.petGroupName + '</option>';
                groupSelect.append(option);
            })

        },
        error: function (error) {


        }
    });
}

loadGroups();

function verifyPetPhoto() {

    let photoContainer = $("#user-photo-file")

    if (photoContainer.val() == "") {

        return true;
    }

    return false;
}