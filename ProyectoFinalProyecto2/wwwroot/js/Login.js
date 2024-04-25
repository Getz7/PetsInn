$("#btnLogin").click(function (e) {
    if (checkBlankInputs()) {
        showSwalAlert("Campos incompletos", '', '', 'error')
    } else {
        e.preventDefault()
        let user = {}
        let API_URL_BASE = "http://localhost:5204";
        user.correo = $("#email").val();
        user.password = $("#password").val();
        if (user.correo == '' || user.password == '') {
            console.log("Aqui va la alerta")
            return
        }

        $.ajax({

            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            url: API_URL_BASE + "/api/User/VerifyUser?correo=" + user.correo + "&password=" + user.password,
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            hasContent: true,
            success: function (result) {
                if (result.identificationNumber != null && result.idRol === 1) {
                    localStorage.setItem("identificationNumber", result.identificationNumber);
                    localStorage.setItem("rol", result.idRol);
                    console.log(localStorage.setItem("rol", result.idRol))
                    window.location.href = '/Reportes/Reportes';
                } else if (result.identificationNumber != null && result.idRol === 2) {
                    localStorage.setItem("identificationNumber", result.identificationNumber);
                    localStorage.setItem("rol", result.idRol);
                    console.log(localStorage.setItem("rol", result.idRol))
                    window.location.href = '/Employee/MenuEmployee';
                } else if (result.identificationNumber != null && result.idRol === 3) {
                    localStorage.setItem("identificationNumber", result.identificationNumber);
                    localStorage.setItem("rol", result.idRol);
                    console.log(localStorage.setItem("rol", result.idRol))
                    window.location.href = '/Client/ClientHomePage';
                } else if (result.identificationNumber == null && result.idRol === 0) {
                    showSwalToast("Verifique que los datos sean correctos!!", "", "error");
                }
                
            },
            error: function (error) {
                console.log("error", error)
            }
        });
    }
});