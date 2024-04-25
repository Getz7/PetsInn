
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

$("#createBtn").click(function (e) {
    e.preventDefault()
    let coupon = {}

    coupon.CouponCode = $("#codigoCupon").val();
    coupon.amountCoupon = $("#monto").val();
    coupon.initialDate = $("#fechaInicial").val();
    coupon.finalDate = $("#fechaFinal").val();
    if (checkBlankInputs()) {
        console.log("Llene todos los espacios")
    } else {
        console.log(coupon);
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            url: "http://localhost:5204" + "/api/Coupon/CreateCoupon",
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(coupon),
            hasContent: true,
            success: function (data) {
                console.log(data)
                showSwalAlert("Cupon Creado", data, "/Employee/CreateCoupon")
            },
            error: function (error) {
                console.log(error.errors)
            }
        });
    }
        
    
    

   
});

