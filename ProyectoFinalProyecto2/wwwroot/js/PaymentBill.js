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

let montoTotal = 0;
let impuestoIva = 0;
$(document).ready(function () {

    let currentUrl = window.location.href;
    let reservationId = getLastPartOfUrl(new URL(currentUrl).pathname);
    console.log(reservationId)
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: API_URL_BASE + "/api/Reservation/GetReservationById?pId=" + reservationId,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (reservation) {
            $("#pet-name").html("Pago Reserva " + reservation.pet.name)
            $("#txt-start-date").html(formatDate(reservation.enterDate))
            $("#txt-exit-date").html(formatDate(reservation.exitDate))
            $("#txt-package-name").html("Paquete " + reservation.package.packageName)
            $("#txt-package-price").html("₡" + reservation.package.price)
            let servicesContainer = $("#lst-services");
            reservation.package.services.forEach((service) => {
                servicesContainer.append('<li>'+service.name+'</li>')
            })
           
            getExtraServices(reservationId);
            recalculate();
        },
        error: function (error) {
            console.log(error)
        }

    });
    getCreditNote()

})

function getLastPartOfUrl(url) {
    var parts = url.split('/');
    return parts[parts.length - 1];
}

 function getCreditNote() {
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        }, url: API_URL_BASE + "/api/CreditNote/GetCreditNoteByUserId?pUserId=" + localStorage.getItem('identificationNumber'),

        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (creditNotes) {
            $("#nota-credito").html("Monto disponible: ₡" + creditNotes.amount)

            recalculate();
        },
        error: function (error) {
            console.log(error)
        }
    });
}

$("#btn-use-credit-note").click(function useCreditNote() {
    $("#btn-use-credit-note").attr('disabled', 'true')
    $("#credit-note-price").html("<i class='fa-solid fa-minus'></i>₡" + $('#nota-credito').text().substring(19))
    $('#nota-credito').text("Monto disponible: ₡0")
    document.getElementById("credit-note-container").style.display = "flex";
    document.getElementById("credit-note-price").style.display = "block";
    document.getElementById("discount-line").style.display = "block";

    recalculate();
})

$('#btn-use-coupon').click(function useCoupon() {
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        }, url: API_URL_BASE + "/api/Coupon/GetCouponByCode?pCode=" + $('#cupones').val() + "&pIdUser=" + localStorage.getItem('identificationNumber'),

        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (coupon, status) {
            if (status == 'nocontent') {
                showSwalToast('El cupón no existe','','error')
            } else {
                $("#coupon-name").html("Cupón " +coupon.couponCode)
                $("#coupon-discount").html("<i class='fa-solid fa-minus'></i>₡" + coupon.amountCoupon)
                document.getElementById("discount").style.display = "flex";
                document.getElementById("discount-line").style.display = "block";
                recalculate();
            }
        },
        error: function (error) {
            showSwalToast("Cupon invalido", " ", "error")
            console.log(error)
        }
    });
})

function getExtraServices(reservationId) {
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        }, url: API_URL_BASE + "/api/Reservation/GetExtraServicesPerReservation?pReservationId=" + reservationId,

        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (extraServices) {
            let extraServicesContainer = $("#lst-extra-services");
            let extraServicesPrices = $("#extra-service-price");
            extraServices.forEach((service) => {
                console.log(service)
                extraServicesContainer.append('<div class="services-extra"><i class="fa-solid fa-plus"></i><p>' + service.name + '</p></div>')
                extraServicesPrices.append("<p class='amount'>₡" +service.price + "</p>")
            })
           
           recalculate();
        },
        error: function (error) {
            console.log(error)
        }
    });

}

function recalculate() {
    let resultado = 0;
    let totalContainer = $("#total");
    const impuesto = 0.13;
    let impuestoTotal = 0;
    let couponDiscount = getAmountFromHtml($("#coupon-discount").text());
    let packagePrice = getAmountFromHtml($("#txt-package-price").html());
    let extraServiceTotal = 0
    let creditNote = getAmountFromHtml($("#credit-note-price").text());

    $(".amount").each(function (index) {
        extraServiceTotal += getAmountFromHtml($(this).text())
    })
    resultado = packagePrice + extraServiceTotal;

    impuestoTotal = resultado * impuesto;
    resultado = resultado - couponDiscount;
    resultado = resultado - creditNote;
    resultado += impuestoTotal;
    $('#impuestoIVA').text(`₡${impuestoTotal}`)
    totalContainer.html(`₡${resultado}`);
    //conversion colones a dolares console.log(Math.round( getAmountFromHtml($("#total").text()) / 550))
}

function getAmountFromHtml(text) {
    return parseInt(text.substring(1)) ? parseInt(text.substring(1)) : 0
}

$("#btn-pagar").click(function payWithPaypal(precio) {
    let userName = "AahPBpw7V7_jnnCq8MFvNBBNoiYdL0ZOrkzzN7JU3YULXjUaTSHfv6AdoS--reBnXWDhmFXSLVz_dqhW";
    let password = "EDmQqm385wGq2hE3L-1Cjhja8Zjp8KCSWrB-gdMBbtcoYkOrS1jxw_PyJZicPTpVugi0O47I9ZBPwZlw";
    let url = "https://api-m.sandbox.paypal.com";
    let accessToken = "";
    let status = false;
    let respuesta = "";
    let data = {

        "intent": "CAPTURE",
        "purchase_units": [{
            "amount": {
                "currency_code": "USD",
                "value": Math.round(getAmountFromHtml($("#total").text()) / 550)
            },
            "description": "Producto de prueba"
        }
        ],
        "application_context": {
            "brand_name": "Pets Inn",
            "landing_page": "NO_PREFERENCE",
            "user_action": "PAY_NOW",
            "return_url": "http://localhost:5160/Client/PaymentConfirm/" + getLastPartOfUrl(window.location.pathname),
            "cancel_url": window.location.origin + window.location.pathname
        },
    }

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/x-www-form-urlencoded",
            
        }, url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(userName + ":" + password));
            },
        method: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        data: "grant_type=client_credentials",

        success: function (result) {
            accessToken = result.access_token;

            $.ajax({
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json",
                    'Authorization': 'Bearer ' + accessToken,
                }, url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",

                method: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                hasContent: true,
                data: JSON.stringify(data),

                success: function (result) {
                    window.location = result?.links[1].href
                    console.log(result)
                },
                error: function (error) {
                    console.log(accessToken)
                    console.log(error)
                }
            });
            console.log(accessToken)

        },
        error: function (error) {
            console.log(error)
        }
    });

    console.log(accessToken)
    
})

function pagar() {
    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        }, url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Berear " + btoa(accessToken));
        },
        method: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (data) {
        },
        error: function (error) {
            console.log(error)
        }
    });
}