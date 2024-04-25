$("#updateUser").click(function (e) {
    e.preventDefault()

    if (checkBlankInputs()) {
        showSwalAlert("Campos incompletos", '', '', 'error')
    } else {
        let user = {}

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        let passwordFinal;

        if (password == confirmPassword) {
            passwordFinal = password;
        } else {
            showSwalToast("Las campos no coinciden!!!", '', '', 'error')
            return;
        }

        user.identificationNumber = localStorage.getItem("identificationNumber");
        user.password = passwordFinal;
        console.log(user);

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            url: "http://localhost:5204" + "/api/User/EditUser",
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(user),
            hasContent: true,
            success: function (data) {
                console.log(data)
                showSwalAlert("Credenciales modificadas correctamente", "", "/Home/Login");
            },
            error: function (error) {
                console.log(error.errors)
            }
        });
    }
});