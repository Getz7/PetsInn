// Function to check user's role before accessing a page
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

$(document).ready(function () {
    new DataTable('#tablaMed', {
        "language": {
            "url": "/Media/es-Es.json"
        }
    });
});

$(document).ready(function () {
    //cambia por red
    fetch('http://192.168.0.7:8080/api/Board/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);
            const table = $('#tablaMed').DataTable();

            
            table.clear();

           
            data.forEach(item => {
                table.row.add([
                    item.humidity,
                    item.temp,
                    item.date, 
                    item.idPlaca,
                    item.idMascota
                ]);
            });
            table.draw();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });





    fetch('http://192.168.0.7:8080/api/Board/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


            const chartData = [];


            data.forEach(item => {
                // Extract numeric value from the string (e.g., '59%' becomes 59)
                const temp = parseInt(item.temp, 10);

                // Check if the conversion is successful and the value is a valid number
                if (!isNaN(temp)) {
                    chartData.push(temp);
                }
            });

            console.log('Chart Data:', chartData);
            var chartCanvas = document.getElementById('myChart2');
            var existingChart = Chart.getChart(chartCanvas);
            if (existingChart) {
                existingChart.destroy();
            }

            // Create a new chart
            var chart = chartCanvas.getContext('2d');
            var myChart = new Chart(chart, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.date),
                    datasets: [{
                        label: 'Temperature',
                        data: chartData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    fetch('http://192.168.0.7:8080/api/Board/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


            const chartData = [];


            data.forEach(item => {

                const humidity = parseInt(item.humidity, 10);


                if (!isNaN(humidity)) {
                    chartData.push(humidity);
                }
            });

            console.log('Chart Data:', chartData);


            var chartCanvas = document.getElementById('myChart');
            var existingChart = Chart.getChart(chartCanvas);
            if (existingChart) {
                existingChart.destroy();
            }

            // Create a new chart
            var chart = chartCanvas.getContext('2d');
            var myChart = new Chart(chart, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.date),
                    datasets: [{
                        label: 'Humidity',
                        data: chartData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
$("#btn-all").click(function (e) {
    e.preventDefault();
    fetch('http://192.168.0.7:8080/api/Board/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


            const chartData = [];


            data.forEach(item => {
                // Extract numeric value from the string (e.g., '59%' becomes 59)
                const humidityValue = parseInt(item.humidity, 10);

                // Check if the conversion is successful and the value is a valid number
                if (!isNaN(humidityValue)) {
                    chartData.push(humidityValue);
                }
            });

            console.log('Chart Data:', chartData);
            var chartCanvas = document.getElementById('myChart2');
            var existingChart = Chart.getChart(chartCanvas);
            if (existingChart) {
                existingChart.destroy();
            }

            // Create a new chart
            var chart = chartCanvas.getContext('2d');
            var myChart = new Chart(chart, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.date),
                    datasets: [{
                        label: 'Humidity',
                        data: chartData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
})


$("#btn-all").click(function (e) {
    fetch('http://192.168.56.1:8080/api/Board/GetData')
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API:', data);


            const chartData = [];


            data.forEach(item => {

                const tempValue = parseInt(item.temp, 10);


                if (!isNaN(tempValue)) {
                    chartData.push(tempValue);
                }
            });

            console.log('Chart Data:', chartData);


            var chartCanvas = document.getElementById('myChart');
            var existingChart = Chart.getChart(chartCanvas);
            if (existingChart) {
                existingChart.destroy();
            }

            // Create a new chart
            var chart = chartCanvas.getContext('2d');
            var myChart = new Chart(chart, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.date),
                    datasets: [{
                        label: 'Temperature',
                        data: chartData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
           .catch(error => {
               console.error('Error fetching data:', error);
           });
})
$("#btn-filtrar").click(function (e) {
    e.preventDefault();
    var idPet = $("#pets").val();
    var initialDate = $("#fechaInicio").val();
    var finalDate = $("#fechaSalida").val();
    console.log(initialDate);
    console.log(finalDate);
    console.log(idPet);
    var apiUrl = 'http://192.168.56.1:8080/api/Board/GetDataByDate';
    var urlWithParams = `${apiUrl}?initialDate=${encodeURIComponent(initialDate)}&finalDate=${encodeURIComponent(finalDate)}&idPet=${encodeURIComponent(idPet)}`;
    fetch(urlWithParams)
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API2:', data);


            const chartData = [];


            data.forEach(item => {

                const humidityValue = parseInt(item.humidity, 10);

                if (!isNaN(humidityValue)) {
                    chartData.push(humidityValue);
                }
            });

            console.log('Chart Data:', chartData);


            var chartCanvas = document.getElementById('myChart2');
            var existingChart = Chart.getChart(chartCanvas);
            if (existingChart) {
                existingChart.destroy();
            }

            // Create a new chart
            var chart = chartCanvas.getContext('2d');
            var myChart = new Chart(chart, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.date),
                    datasets: [{
                        label: 'Humidty',
                        data: chartData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

})

$("#btn-filtrar").click(function (e) {
    e.preventDefault();
    
    var idPet = $("#pets").val();
    var initialDate = $("#fechaInicio").val();
    var finalDate = $("#fechaSalida").val();
    console.log(initialDate);
    console.log(finalDate);
    console.log(idPet);
    var apiUrl = 'http://192.168.0.7:8080/api/Board/GetDataByDate';
    var urlWithParams = `${apiUrl}?initialDate=${encodeURIComponent(initialDate)}&finalDate=${encodeURIComponent(finalDate)}&idPet=${encodeURIComponent(idPet)}`;
    console.log(urlWithParams)
    fetch(urlWithParams)
        .then(response => response.json())
        .then(data => {
            console.log('Data retrieved from API2:', data);


            const chartData = [];


            data.forEach(item => {
                
                const temp = parseInt(item.temp, 10);

                if (!isNaN(temp)) {
                    chartData.push(temp);
                }
            });

            console.log('Chart Data:', chartData);


            var chartCanvas = document.getElementById('myChart');
            var existingChart = Chart.getChart(chartCanvas);
            if (existingChart) {
                existingChart.destroy();
            }

            // Create a new chart
            var chart = chartCanvas.getContext('2d');
            var myChart = new Chart(chart, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.date),
                    datasets: [{
                        label: 'Temperature',
                        data: chartData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });



    
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
                $("#nombre").val(user.name)
                $("#apellido").val(user.lastName)

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
                        $("#pets").html("")
                        pets.forEach((pet) => {
                            $("#pets").append('<option value="' + pet.idPet + '">' + pet.name + '</option>')
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