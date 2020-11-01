$(document).ready(function () {
  //api for weatherDashboard to be used and variables
  var requestURL = "https://openweathermap.org/api";
  var apiKey = "1cc6e155505b32f27611acb105e29232";

  //local storage of searched cities
  var searchedCities = JSON.parse(localStorage.getItem("citySearched")) || [];
  //for loop to displayed searched cities from local storage
  for (var i = 0; i < searchedCities.length; i++) {
    listMaker(searchedCities[i]);
  }

  function listMaker(city) {
    var li = $("<li>")
      .addClass("list-group-item list-group-item-action")
      .text(city);
    $("#listCity").append(li);
  }

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
    //Search Button Value and input
    $("#searchButton").on("click", function () {
        var cityInput = $("#inputField").val();
        $("#inputField").val("");
        weatherSearch(cityInput);
  });

  //EVENT HANDLER for list
  $("#listCity").on("click", "li", function () {
    weatherSearch($(this).text());
    console.log($(this).text());
  });
  //Function for Current Weather Search
  function weatherSearch(cityInput) {
    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInput +
        "&appid=" +
        apiKey +
        "&units=imperial",
      dataType: "json",
    }).then(function (data) {
      console.log(data);
      if (searchedCities.indexOf(cityInput) === -1) {
        searchedCities.push(cityInput);
        localStorage.setItem("citySearched", JSON.stringify(searchedCities));
        listMaker(cityInput);
      }

      $(".curChoice").empty();
      //Creating current choice card and variables to display city choice
      var newCard = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var searchedCity = $("<h3>").addClass("card-title").text(data.name);
      var weatherDates = $("<h5>")
        .addClass("card-title")
        .text(new Date().toLocaleDateString());
      var windSpeed = $("<p>")
        .addClass("card-text")
        .text("Wind Speed: " + data.wind.speed);
      var cityTemp = $("<p>")
        .addClass("card-text")
        .text("Temperature: " + data.main.temp);
      var cityHumidity = $("<p>")
        .addClass("card-text")
        .text("Humidity: " + data.main.humidity);
      var iconImage = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      //appending data retrieved to card
      searchedCity.append(weatherDates, iconImage);
      cardBody.append(searchedCity, windSpeed, cityTemp, cityHumidity);
      newCard.append(cardBody);
      $(".curChoice").append(newCard);
      foreCast(cityInput);
      uvIndex(data.coord.lat, data.coord.lon);
    });
  }
  //function for forecast
  function foreCast(cityInput) {
    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityInput +
        "&appid=" +
        apiKey +
        "&units=imperial",
      dataType: "json",
    }).then(function (data) {
      console.log(data);
      $("#fiveDayForecast")
        .html('<h3 class="mt-3">5-Day Forecast:</h4>')
        .append('<div class="row">');
      //for loop searching for 3pm all across the board
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          //variables to append to 5 day forecast cards
          var weatherDisplay = $("<div>").addClass("col-md-2");
          var newCard = $("<div>").addClass("card bg-primary text-white");
          var cardBody = $("<div>").addClass("card-body p-2");
          var weatherDates = $("<h5>")
            .addClass("card-title")
            .text(new Date(data.list[i].dt_txt).toLocaleDateString());
          var iconImage = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/w/" +
              data.list[i].weather[0].icon +
              ".png"
          );
          var cityTemp = $("<p>")
            .addClass("card-text")
            .text("Temperature: " + data.list[i].main.temp);
          var cityHumidity = $("<p>")
            .addClass("card-text")
            .text("Humidity: " + data.list[i].main.humidity);
          //appending data retrieved
          cardBody.append(weatherDates, iconImage, cityTemp, cityHumidity);
          newCard.append(cardBody);
          weatherDisplay.append(newCard);
          $("#fiveDayForecast .row").append(weatherDisplay);
        }
      }
    });
  }
  //UV index Function
  function uvIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url:
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey,
      dataType: "json",
    }).then(function (data) {
      console.log(data);
      var uvTag = $("<button>").addClass("btn btn-sm").text(data.value);
      if (data.value < 3) {
        uvTag.addClass("btn-success");
      } else if (data.value < 7) {
        uvTag.addClass("btn-warning");
      } else {
        uvTag.addClass("btn-danger");
      }
      $(".curChoice .card-body").append(uvTag);
    });
  }
});
