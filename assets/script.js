var apiKey = "8f2df02f88c96d01519b05c729d9fa02"
var searchBtn = document.querySelector("#search-button");
var currentDisplay = document.querySelector("#current-weather");
var searchHistory = document.querySelector(".search-history")
// var searchCity = document.querySelector("#search-city");


function searchCity() {
    var searchCity = document.querySelector("#search-city").value;
    console.log(searchCity);
    currentWeather(searchCity);

    //  localStorage.setItem(searchCity, data);
};



function currentWeather(searchCity) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey + "&units=imperial";

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            var h2 = document.createElement("h2");
            h2.textContent = data.name + " (" + moment().format("l") + ")";

            var temp = document.createElement("temp");
            temp.textContent = "Temperature: " + data.main.temp;

            var humidity = document.createElement("humidity");
            humidity.textContent = "Humidity: " + data.main.humidity;

            // var uvIndex = document.createElement("uvIndex");
            // uvIndex.textContent = "UV Index: " + 

            // Do callback for other API function here, because data is where I have lat./long.
            currentDisplay.append(h2, temp, humidity);

            // localStorage.setItem(searchCity, [h2, temp, humidity);
        })



};

searchBtn.addEventListener("click", searchCity);
