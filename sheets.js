$(document).ready(function (){
//api for weatherDashboard to be used and variables
var requestURL = "https://openweathermap.org/api"; 
var apiKey ="1cc6e155505b32f27611acb105e29232";
//local storage of searched cities
var searchedCities = JSON.parse(localStorage.getItem("citySearched")) || [];
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
//Search Button Value and input
$("#searchButton").on("click", function(){
    var cityInput = $("#inputField").val();
    weatherSearch(cityInput);
})
//Function for Current Weather Search
function weatherSearch(cityInput){
 $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial",
    dataType: "json"
 }).then(function(data){
    console.log(data);
    $(".curChoice").empty();
    //Creating current choice card and variables to display city choice
    var newCard = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var searchedCity = $("<h3>").addClass("card-title").text(data.name);
    var windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed);
    var cityTemp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp);
    var cityHumidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity);
    var iconImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    //appending data retrieved to card
    searchedCity.append(iconImage);
    cardBody.append(searchedCity, windSpeed, cityTemp, cityHumidity);
    newCard.append(cardBody);
    $(".curChoice").append(newCard);
    foreCast(cityInput);
 })
}
//function for forecast
function foreCast(cityInput){
$.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey + "&units=imperial",
    dataType: "json"
}).then(function(data){
    console.log(data);
    //for loop searching for 3pm all across the board
    for (var i = 0; i < data.list.length; i++){
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1){
            //variables to append to 5 day forecast cards
            var weatherDisplay = $("<div>").addClass("col-md-2")
            var newCard = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var weatherDates = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString())
            var iconImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            var cityTemp = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp);
            var cityHumidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity);
            //appending data retrieved
            cardBody.append(weatherDates, iconImage, cityTemp, cityHumidity);
        

        }
    };


})


}







}

);