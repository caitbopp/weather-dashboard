var apiKey = "8f2df02f88c96d01519b05c729d9fa02"
var currentDisplay = document.querySelector("#current-weather");



function currentWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })

        .then(function (data) {
            console.log(data);
            var h1 = document.createElement("h1");
            h1.textContent = data.name;
            
            // Do callback for other API function here, because data is where I have lat./long.



            currentDisplay.append(h1);

        });
}

currentWeather("Seattle");