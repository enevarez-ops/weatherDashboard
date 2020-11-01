$(document).ready(function (){
    //api for weatherDashboard to be used 
var requestURL = "https://openweathermap.org/api" 
var apiKey ="1cc6e155505b32f27611acb105e29232"

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

$("#searchButton").on("click", function(){
    var cityInput = $("#inputField").val();
    console.log(cityInput);
    alert("BACON");


})








}

);