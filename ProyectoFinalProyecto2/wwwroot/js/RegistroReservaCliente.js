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
console.log(localStorage.getItem("identificationNumber"))

let selectedId; // Declare selectedId in the outermost scope

// Event listener for radio buttons
$(document).on('change', 'input:radio[name="drone"]', function () {
    if ($(this).is(':checked')) {
        selectedId = $(this).val();
        console.log('Selected ID:', selectedId);
        $('#services-container').empty();
        GetAdditionalServices(selectedId);
    }
});


$("#btn-continue").click(function (e) {
    e.preventDefault();

    if (!selectedId) {
        showSwalAlert("Error", "Por favor, seleccione un paquete", "", "error")
        return;
    }

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
        let additionalServices = [];

       
        $("input:checkbox[name=services-checked]:checked").each(function () {
            additionalServices.push({
                id: $(this).val()
            });
        });

        let reservation = {
            pet: {
                idPet: $("#pet").val()
            },
            enterDate: $("#date-E").val(),
            exitDate: $("#date-S").val(),
            specialAspects: $("#special-Aspects").val(),
            package: {
                idPackage: selectedId
            },
            additionalServices: additionalServices
        };

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
            success: function (idReservation) {
                showSwalAlert("Registro de reserva exitoso!", "", "/Client/PaymentBill/" + idReservation);
            },
            error: function (error) {
                console.log(error.errors);
            }
        });
    }
});



    

           

     

$(document).ready(function () {
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204" + "/Pets/GetPetsListbyId?id=" + localStorage.getItem("identificationNumber"),
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (pets) {
            $("#pet").html("")
            pets.forEach((pet) => {
                $("#pet").append('<option value="' + pet.idPet + '">' + pet.name + '</option>')
            })

        },
        error: function (error) {


        }
    });
    fetch('http://localhost:5204/api/Package/GetDataWithServices')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);

            data.forEach(package => {
                const radioDiv = $('<div class="radio">  <input class="input-radio" type="radio" id="' + package.idPackage + '" name="drone" value="' + package.idPackage + '"  /> </div>');
                const packageDiv = $('<div class="package"></div>');
                const containerDiv = $('<div class="container-packages2"></div>');
                const serviceslist = $('<div class="name"></div>');
                const subnameDiv = $('<div class="subname"></div>');
                const nameParagraph = $(`<p>${package.packageName}</p>`);
                containerDiv.append(nameParagraph);

                const servicesDiv = $('<div class="services"><ul></ul></div>');

                // Iterate over services and add them to the list
                package.services.forEach(service => {
                    const serviceItem = $(`<li>${service.name}</li>`);
                    servicesDiv.find('ul').append(serviceItem);
                });

                serviceslist.append(servicesDiv);

                packageDiv.append(radioDiv);
                packageDiv.append(containerDiv);
                packageDiv.append(serviceslist);
               

                $('.form-row2').append(packageDiv);
                radioDiv.find('input').on('change', function () {
                    // Remove the 'checked' class from all packages
                    $('.package').removeClass('checked');
                    $('.radio').removeClass('checked');
                    $('.container-packages2').removeClass('checked');
                    $('.services').removeClass('checked');

                    // Add the 'checked' class to the selected package
                    if ($(this).is(':checked')) {
                        radioDiv.addClass('checked');
                        containerDiv.addClass('checked');
                        packageDiv.addClass('checked');
                        servicesDiv.addClass('checked');
                    }
                });

            });
        });

});

function GetAdditionalServices(idPackage) {
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: API_URL_BASE + "/api/Reservation/GetAdditionalServicesAvailable?idPackage=" + idPackage,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (services) {

            for (let i = 0; i < services.length; i++) {
                let serviceDiv = '<div class="input-container-services">' +
                    '<label class="custom-checkbox">' +
                    '<input name="services-checked" type="checkbox" value="' + services[i].id + '">' +
                    '<span class="checkmark"></span>' +
                    '<span class="text">' + services[i].name + '</span>' +
                    '</label>' +
                    '</div>'

                $("#services-container").append(serviceDiv);
            }
        },
        error: function (error) {
            console.log("error", error)
        }
    });
}



