$(document).ready(function () {


    var apiKey = "8f2df02f88c96d01519b05c729d9fa02"
    var searchBtn = document.querySelector("#search-button");
    var currentDisplay = document.querySelector("#current-weather");
    var searchedWeather = [];
    var cardRow = document.querySelector(".card-row");
    var fiveDayForecast = document.querySelector("#five-day");
    var uvi = "";



    function searchCity() {
        var searchCity = document.querySelector("#search-city").value;
        console.log(searchCity);
        currentWeather(searchCity);
        // Not working functions:

        getFiveDayForecast(searchCity);

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
                getUVIndex(data.coord.lat, data.coord.lon);
                var weatherIcon = data.weather[0].icon;
                var iconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";

                $(".current-city").html(data.name + " (" + moment().format("l") + ")");
                $(".weather-icon").attr('src', iconUrl);
                $(".temperature").text("Temperature: " + data.main.temp + "°F");
                $(".humidity").text("Humidity: " + data.main.humidity + "%");
                $(".wind-speed").text("Wind Speed: " + data.wind.speed + " MPH");

            });

    };


    function getUVIndex(lat, lon) {
        var getUVIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + apiKey;

        fetch(getUVIndex)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $(".uvIndex").text("UV Index: " + data.current.uvi);
                console.log(data);
            })
    }

    function getFiveDayForecast(searchCity) {
        var getFiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + apiKey + "&units=imperial";

        fetch(getFiveDayForecast)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                var results = data.list.filter(day => day.dt_txt.includes("12:00:00"));
                console.log(results);
                $("#five-day").empty();

                for (var i = 0; i < results.length; i++) {
                    var column = $("<div>").attr("class", "col");
                    var card = $("<div>").attr("class", "card");
                    var cardBody = $("<div>").attr("class", "card-body");
                    var h3 = $("<h3>").text(results[i].dt_txt);
                    var weatherIcon = results[i].weather[0].icon;
                    var iconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";

                    var icon = $("<img>").attr('src', iconUrl);
                    var temp = $("<p>").text("Temperature: " + results[i].main.temp + "°F");
                    var humidity = $("<p>").text("Humidity: " + results[i].main.humidity + "%");
                    var windSpeed = $("<p>").text("Wind Speed: " + results[i].wind.speed + " MPH");

                    cardBody.append(h3, icon, temp, humidity, windSpeed);
                    card.append(cardBody);
                    column.append(card);
                    $("#five-day").append(column);
                }



             


            });


    }


    function setLocalStorage() {
        searchedWeather.push(currentDisplay)
        // console.log(searchedWeather);
        localStorage.setItem("previously-searched-weather", searchedWeather);
    }

    searchBtn.addEventListener("click", searchCity, setLocalStorage);



})