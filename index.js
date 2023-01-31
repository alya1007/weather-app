const API_KEY = "8b81c91f17aa506a7ac933925035c1a4";
const lon = 46.87;
const lat = 29.23;

function createWeatherCard(title, valueTitles, elements) {
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather");
  const weatherTitle = document.createElement("div");
  weatherTitle.classList.add("weather-title");
  weatherTitle.textContent = title;
  weatherCard.appendChild(weatherTitle);
  for (let i = 0; i < elements.length; i++) {
    weatherCard.appendChild(createWeatherItem(elements[i], valueTitles[i]));
  }
  return weatherCard;
}

function createWeatherItem(data, title) {
  const weatherItem = document.createElement("div");
  weatherItem.classList.add("weather-item");
  weatherItem.id = title;
  weatherItem.textContent = `${title}: ${data}`;
  return weatherItem;
}

function setTime() {
  let dateWithoutSecond = new Date();
  document.getElementById("time").textContent =
    dateWithoutSecond.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
}

setTime();

async function getWeatherData() {
  const weatherTitles = ["Temperature", "Humidity", "Pressure"];
  const windTitles = ["Degree", "Gust", "Speed"];

  const weatherContent = document.querySelector(".weather-content");
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    console.log(data);
    const weatherElements = getWeatherElements(data);
    const windElements = getWindElements(data);
    weatherContent.appendChild(
      createWeatherCard("Weather", weatherTitles, weatherElements)
    );
    weatherContent.appendChild(
      createWeatherCard("Wind", windTitles, windElements)
    );
  } catch (error) {
    console.error(error);
    weatherContent.appendChild(createErrorElement());
  }
}
getWeatherData();

function getWeatherElements(data) {
  let { temp, humidity, pressure } = data.main;
  let values = [temp, humidity, pressure];
  return values;
}

function getWindElements(data) {
  let { deg, gust, speed } = data.wind;
  let values = [deg, gust, speed];
  return values;
}

function createErrorElement() {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error");
  errorElement.textContent = "Error";
  return errorElement;
}
