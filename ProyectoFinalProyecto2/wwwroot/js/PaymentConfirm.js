let token = new URLSearchParams(window.location.search).get("token")
console.log(token)

$(document).ready(function () {

    let userName = "AahPBpw7V7_jnnCq8MFvNBBNoiYdL0ZOrkzzN7JU3YULXjUaTSHfv6AdoS--reBnXWDhmFXSLVz_dqhW";
    let password = "EDmQqm385wGq2hE3L-1Cjhja8Zjp8KCSWrB-gdMBbtcoYkOrS1jxw_PyJZicPTpVugi0O47I9ZBPwZlw";
    let url = "https://api-m.sandbox.paypal.com/v2/checkout/orders/" + token + "/capture";
    let accessToken = "";
    let status = false;
    let respuesta = "";

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
        }, url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(userName + ":" + password));
        },
        method: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (result) {
            console.log(result)
            let payment = {
                amount: result.purchase_units[0].payments.captures[0].amount.value,
                iva: 13,
                reservation: {
                    idReservation: window.location.pathname.split('/')[3]
                }
            }
            console.log(payment)
            $.ajax({
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                url: "http://localhost:5204/Payments/ConfirmPayment",
                method: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                hasContent: true,
                data: JSON.stringify(payment),
                success: function (result) {
                    console.log(result)

                },
                error: function (error) {
                    console.log("error", error)
                }
            });
        },
        error: function (error) {
            console.log(error)
        }
    });

});
