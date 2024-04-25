// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var API_URL_BASE = "http://localhost:5204";

let userPermissions = {
    ADMIN: [
        "Admin/PetsList",
        "Admin/UserModify",
        "Admin/UsersList",
        "CambiarContrasena/CambiarContrasena",
        "Pets/AsignBoardPet",
        "Pets/PetsLits",
        "Pets/RegisterPet",
        "RegistroReserva/RegistroReserva",
        "Reportes/Reportes",
        "Reservaciones/Reservaciones",
        "Services/ServicesModify",
        "Services/ServicesList"
    ],
    EMPLOYEE: [
        "Employee/CreateCoupon",
        "Employee/GroupConfiguration",
        "Employee/MenuEmployee",
        "Employee/PackageDelete",
        "Employee/PackageModify",
        "Employee/RegisterReservation",
        "CambiarContrasena/CambiarContrasena"
    ],
    CLIENT: [
        "CambiarContrasena/CambiarContrasena",
        "Client/ClientHomePage",
        "Client/PaymentBill",
        "Client/RegisterReservation",
        "Client/ReservationHistory"
    ]
}
function checkPageAccess(role, page) {
    if (!checkPagePermission(role, page)) {
        showSwalToast("No tienes permisos para acceder a esta página");
        // Redirect the user to a default page or handle unauthorized access as needed
        window.location.href = 'Home/Home';
    }
}

function checkPagePermission(role, page) {
    return userPermissions[getRoleName(role)] && userPermissions[getRoleName(role)].includes(page);
}

function getRoleName(roleId) {
    switch (roleId) {
        case 1:
            return "ADMIN";
        case 2:
            return "EMPLOYEE";
        case 3:
            return "CLIENT";
        default:
            return "";
    }
}

function checkBlankInputs() {
    
    var inputs = document.querySelectorAll('.required');

   
    var hasEmptyInput = false;

    
    inputs.forEach(function (input) {
        
        if (input.value.trim() === '') {
            
            input.classList.add('input-error');
            hasEmptyInput = true;
        } else {
           
            input.classList.remove('input-error');
        }
    });

    
    return hasEmptyInput;
}

function showSwalAlert(title, text, redirectionUrl, icon = 'success', confirmButtonText = 'Aceptar', cancelButtonText = '') {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        showCancelButton: cancelButtonText != '',
        iconColor: 'white',
        color: 'white',
        background: icon === 'error' ? '#DB363B' : '#A5B463',
        confirmButtonColor: '#A5B463',
        customClass: {
            confirmButton: 'swal-button',
            cancelButton: 'swal-button-cancel'
        }
    }).then((result) => {
        if (redirectionUrl) {
            window.location.href = redirectionUrl
        }
    })
}
function showSwalToast(title, redirectionUrl, icon = 'success') {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: title
    }).then(() => {
        if (redirectionUrl) {
            window.location.href = redirectionUrl
        }
    });
}


$("#logout").click(function (e) {
    localStorage.clear();
    window.location.href = '/Home/Home';
});

let currentRol = localStorage.getItem("rol");
let urlAdmin = "";
let urlEmpleado = "";
let urlCliente = "";
function validarUsuario(urlAdmin, urlEmpleado, urlCliente) {
    if (currentRol == 1) {
        return window.location.href = urlAdmin;
    } else if (currentRol == 2) {
        return window.location.href = urlEmpleado;
    } else if (currentRol == 3) {
        return window.location.href = urlCliente;
    }
}


function formatDate(date) {
    let fecha =  new Date(date)
    return fecha.toLocaleDateString('en-GB')
}   