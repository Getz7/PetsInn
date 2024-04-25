
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
    fetch('http://localhost:5204/api/Package/GetDataWithServices')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);

            data.forEach(package => {
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
                
                const button = $('<button id="' + package.idPackage + '" onClick="goToEditPackage(this)"><i class="fa-solid fa-circle-plus"></i></button>');
                const button2 = $('<button id="' + package.idPackage + '" onClick="goToDeletePackage(this)"><i class="fa-solid fa-trash"></i></button>');
               /* const iconPencilDiv = $('<div class="icon-pencil"></div>');*/
                containerDiv.append(button);
                containerDiv.append(button2);
                //iconPencilDiv.append(button);
                //iconPencilDiv.append(button2);
               
                /*containerDiv.append(iconPencilDiv);*/

                packageDiv.append(containerDiv);
                packageDiv.append(serviceslist);

                $('.container-packages').append(packageDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});




const goToEditPackage = (e) => {
    console.log("button", e.id)


    window.location.href = '/Employee/PackageModify/'+e.id

}
const goToDeletePackage = (e) => {
    console.log("button", e.id)


    window.location.href = '/Employee/PackageDelete/' + e.id

}
