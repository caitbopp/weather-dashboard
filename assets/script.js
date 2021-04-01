var apiKey = "8f2df02f88c96d01519b05c729d9fa02"
var searchBtn = document.querySelector("#search-button");
var currentDisplay = document.querySelector("#current-weather");
var searchHistory = document.querySelector(".search-history")
var cardRow = document.querySelector(".card-row");
var fiveDayForecast = document.querySelector("#five-day");
// var lat = "";
// var lon = "";
// var uvi = "";



function searchCity() {
    var searchCity = document.querySelector("#search-city").value;
    console.log(searchCity);
    currentWeather(searchCity);
    getUVIndex(searchCity);
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
            $(".wind-speed").text("Wind Speed: " + data.wind.speed + " MPH");
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

            var results = data.list;

            $("#five-day").empty();

            for (var i = 0; i < results.length; i += 8) {
                // var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
                var date = results[i].dt_txt;
                var setD = date.substr(0, 10)
                var temp = results[i].main.temp;
                var hum = results[i].main.humidity;

                //creating tags with the result items information.....
                var h5date = document.createElement("h5").text(setD);
                var pTemp = document.createElement("p").text("Temp: " + temp);
                var pHum = document.createElement("p").text("Humidity " + hum);
                // var h5date = $("<h5 class='card-title'>").text(setD);
                // var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
                // var pHum = $("<p class='card-text'>").text("Humidity " + hum);;

                var weather = results[i].weather[0].main

            }
            fiveDayForecast.append(weather);
        });

        // fiveDayForecast.append(h5date, pTemp, pHum);
        // $("#5day").append(fiveDayDiv);

}

searchBtn.addEventListener("click", searchCity);
