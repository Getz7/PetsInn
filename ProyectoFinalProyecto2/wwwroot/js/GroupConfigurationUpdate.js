
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
$("#btn-continue").click(function (e) {
    e.preventDefault();
    let currentUrl = window.location.href;
    let id = getLastPartOfUrl(currentUrl);

    const group = {
        petGroupName: $("#txt-groupName").val(),
        petGroupSize: $("#txt-tamannoGrupo").val(),
        petGroupType: $("#txt-groupType").val(),
        petGroupDescription: $("#txt-groupDescription").val(),
        petGroupAggressiveness: $("#aggressiveness").val(),
        idGroup: id
    };

    console.log(group);

    if (checkBlankInputs()) {
        showSwalAlert("Error", "Por favor, llene los campos faltantes", "", "error")
    } else {

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            url: "http://localhost:5204" + "/api/Groups/UpdateGroup",
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(group),
            hasContent: true,
            success: function (data) {

                showSwalAlert("Grupo configurado", data, "/Employee/GroupConfiguration")
           
            },
            error: function (error) {
                console.log(error.errors)
            }
        });
    }


});
function getLastPartOfUrl(url) {
    var parts = url.split('/');
    return parts[parts.length - 1];
}

function getCurrentGroup() {
    let currentUrl = window.location.href;
    let groupId = getLastPartOfUrl(currentUrl);

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        url: "http://localhost:5204" + "/api/Groups/GetPetGroupById?groupId=" + groupId,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        hasContent: true,
        success: function (group) {
            console.log(group)
            $("#group-name").html("Grupo " + group.petGroupName);
            $("#txt-groupName").val(group.petGroupName);
            $("#txt-tamannoGrupo").val(group.petGroupSize);
            $("#aggressiveness").val(group.petGroupAggressiveness);
            $("#txt-groupType").val(group.petGroupType);
            $("#txt-groupDescription").val(group.petGroupDescription);
        },
        error: function (error) {
            console.log(error.errors)
        }
    });

}

getCurrentGroup();