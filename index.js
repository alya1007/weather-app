const API_KEY = "8b81c91f17aa506a7ac933925035c1a4";
const lon = 46.87;
const lat = 29.23;

function getTime(){
    var dateWithouthSecond = new Date();
    return dateWithouthSecond.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

document.getElementById("time").innerHTML = getTime();

function getWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
        hideLoadingScreen();
        console.log(data);
        showWeather(data);
    })
}

getWeatherData();

function showWeather(data){
    let {temp, humidity, pressure} = data.main;
    let {deg, gust, speed} = data.wind;
    document.getElementById("temperature").innerHTML = `Temperature: ${temp}°C`
    document.getElementById("humidity").innerHTML = `Humidity: ${humidity}%`
    document.getElementById("pressure").innerHTML = `Pressure: ${pressure}`
    document.getElementById("deg").innerHTML = `Degree: ${deg}`
    document.getElementById("gust").innerHTML = `Gust: ${gust} m/s`
    document.getElementById("speed").innerHTML = `Speed: ${speed} m/s`
}

var loader = document.getElementById("preloader");
function hideLoadingScreen(){
    loader.style.display = "none";
}