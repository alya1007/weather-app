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
    document.getElementById("weather").innerHTML = `${temp}°C`
    document.getElementById("wind").innerHTML = `${speed} m/s`
}

var loader = document.getElementById("preloader");
function hideLoadingScreen(){
    loader.style.display = "none";
}