var apiKey = "8f2df02f88c96d01519b05c729d9fa02"
var searchBtn = document.querySelector("#search-button");
var currentDisplay = document.querySelector("#current-weather");
var searchHistory = document.querySelector(".search-history")
var cardRow = document.querySelector(".card-row");



function searchCity() {
    var searchCity = document.querySelector("#search-city").value;
    console.log(searchCity);
    currentWeather(searchCity);
    getFiveDayForecast(searchCity);

    //  localStorage.setItem(searchCity, data);
};

function getUVIndex(lat, lon) {
    var getUVIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(getUVIndex)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $(".uvIndex").text(data.current.uvi);
            console.log(data);
        })
}

function currentWeather(searchCity) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey + "&units=imperial";


    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var weatherIcon = data.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";

            $(".current-city").html(data.name + " (" + moment().format("l") + ")");
            $(".weather-icon").attr('src', iconUrl);
            $(".temperature").text("Temperature: " + data.main.temp + "°F");
            $(".humidity").text("Humidity: " + data.main.humidity + "%");
            $(".uvIndex").text(data.current.uvi);
        });

};

function getFiveDayForecast(searchCity) {
    var getFiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + apiKey + "&units=imperial";

    fetch(getFiveDayForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })

        $(".date")
    

}

searchBtn.addEventListener("click", searchCity);
