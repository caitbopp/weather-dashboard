var apiKey = "8f2df02f88c96d01519b05c729d9fa02"
var searchBtn = document.querySelector("#search-button");
var currentDisplay = document.querySelector("#current-weather");


function searchCity() {
    var searchCity = document.querySelector("#search-city").value;
    console.log(searchCity);
    currentWeather(searchCity);
};



function currentWeather(searchCity) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey + "&units=imperial";

    fetch(queryUrl)
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

            var temp = document.createElement("temp");
            temp.textContent = "Temperature: " + data.main.temp;

            var humidity = document.createElement("humidity");
            humidity.textContent = "Humidity: " + data.main.humidity;

            // Do callback for other API function here, because data is where I have lat./long.
            currentDisplay.append(h1, temp, humidity);
        })

};

searchBtn.addEventListener("click", searchCity);
