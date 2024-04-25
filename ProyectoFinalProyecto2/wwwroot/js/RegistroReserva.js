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


$('#packages').on('change', function () {
    $("#services-container").html("");
    if (this.value === "") {
        return
    }
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: API_URL_BASE + "/api/Reservation/GetAdditionalServicesAvailable?idPackage=" + this.value,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (services) {
            for (let i = 0; i < services.length; i++) {
                let serviceDiv = '<div class="input-container-services">'+
                    '<label class="custom-checkbox">'+
                        '<input name="services-checked" type="checkbox" value="'+ services[i].id +'">'+
                            '<span class="checkmark"></span>'+
                            '<span class="text">' + services[i].name + '</span>'+
                    '</label>'+
                '</div>'

                $("#services-container").append(serviceDiv);
            }
        },
        error: function (error) {
            console.log("error", error)
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

$("#btn-continue").click(function (e) {
    e.preventDefault()

    if (checkBlankInputs()) {
        showSwalAlert("Error", "Por favor, llene los campos faltantes", "", "error")
    } else {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);


        let enterDate = new Date($("#date-E").val());
        let exitDate = new Date($("#date-S").val());

        if (enterDate < currentDate) {
            showSwalAlert("Error", "La fecha de entrada no puede ser en el pasado", "", "error");
            return;
        }


        if (exitDate <= enterDate) {
            showSwalAlert("Error", "La fecha de salida debe ser posterior a la fecha de entrada", "", "error");
            return;
        }
        let additionalServices = []
        $("input:checkbox[name=services-checked]:checked").each(function () {
            additionalServices.push({
                id: $(this).val()
            }
            );
        });


        let reservation = {
            pet: {
                idPet: $("#pet").val()
            },
            enterDate: $("#date-E").val(),
            exitDate: $("#date-S").val(),
            specialAspects: $("#special-Aspects").val(),
            package: {
                idPackage: $("#packages").val()
            },
            additionalServices: additionalServices
        }



        console.log(reservation);

      

            $.ajax({
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                url: "http://localhost:5204" + "/api/Reservation/CreateReservation",
                method: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify(reservation),
                hasContent: true,
                success: function (reservation) {
                    console.log(reservation)
                    showSwalAlert("Registro de reserva exitoso!", "", "/Reportes/Reservaciones")

                },
                error: function (error) {
                    console.log(error.errors)
                }
            });


            //$.ajax({
            //    headers: {
            //        'Accept': "application/json",
            //        'Content-Type': "application/json"
            //    },
            //    url: "http://localhost:5204" + "/api/Reservation/CreateReservation",
            //    method: "POST",
            //    contentType: "application/json;charset=utf-8",
            //    dataType: "json",
            //    data: JSON.stringify(user),
            //    hasContent: true,
            //    success: function (data) {
            //        console.log(data)
            //        showSwalAlert("Registro de reserva exitoso!", "", "/Reportes/Reservaciones")
            //    },
            //    error: function (error) {
            //        console.log(error.errors)
            //        alert('Por favor, completa todos los campos');
            //    }
            //});
        
    };
})

//setup before functions
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
            if (user !== undefined) {
                $("#names").val(user.name)
                $("#last-name").val(user.lastName)

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
                        $("#pet").html("")
                        pets.forEach((pet) => {
                            $("#pet").append('<option value="'+pet.idPet+'">'+ pet.name +'</option>')
                        })

                    },
                    error: function (error) {


                    }
                });
            
            } else {
                $("#names").val("")
                $("#last-name").val("")
                $("#pet").html('<option value="">Ingrese el numero de identificacion</option>')

            }
            
        },
        error: function (error) {
           

        }
    });
}

//$(document).ready(function () {

//    $.ajax({

//        headers: {
//            'Accept': "application/json",
//            'Content-Type': "application/json"
//        },
//        url: "http://localhost:5204/api/User/GetUserbyId?id=" + idClient,
//        method: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        hasContent: true,
//        success: function (result) {
//            console.log(result, "Result")

//            //populateLabels(result)
//        },
//        error: function (error) {
//            console.log("error", error)
//        }
//    });
//});

function populateLabels(result) {
    console.log("Populating labels with:", result);
    //$("#names").val(result[0].name);
    //$("#last-name").val(result[0].lastName);
    //$("#pet").val(result[0].pet);
    //console.log("Se actualizaron los inputs")
}


//////////////////////////////////////////////////////////////////////////////////////
//document.getElementById('btn-continue').addEventListener('click', function () {
//    const idClient = document.getElementById('id-Client').value;
//    const name = document.getElementById("names").value;
//    const lastName = document.getElementById('last-name').value;
//    const pet = document.getElementById('pet').value;
//    const dateE = document.getElementById('date-E').value;
//    const dateS = document.getElementById('date-S').value;
//    const specialAspects = document.getElementById('special-Aspects').value?? "";
//    const package = document.getElementById('packages').value;

//    if (idClient && name && lastName && pet && dateE && dateS && specialAspects && package) {
//        document.getElementById('popup').style.display = 'block';
//        document.getElementById('overlay').style.display = 'block';
//    } else {
//        alert('Por favor, completa todos los campos (servicios no requeridos)');
//    }
//    document.querySelector('.cancel').addEventListener('click', function () {
//        document.getElementById('popup').style.display = 'none';
//        document.getElementById('overlay').style.display = 'none';
//    });
//});
