const form = document.querySelector("#weatherform");
const city = document.querySelector("#city");
const container = document.querySelector(".info");
const history = document.querySelector("#searchHistory");
const consoleBox = document.querySelector("#consoleBox");

function logMessage(msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  consoleBox.appendChild(p);
}

let visitedCities = JSON.parse(localStorage.getItem("visitedCities")) || [];

const API_KEY = "191867c886c9b1b8f463dd3074f92461";

async function searchWeather(cityName) {
  try {
    consoleBox.innerHTML = "";

    logMessage("1️⃣ Sync Start");

    const responsePromise = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
    );

    logMessage("[ASYNC] Start fetching");

    logMessage("2️⃣ Sync End");

    const response = await responsePromise;

    logMessage("3️⃣ Promise.then (Microtask)");

    const weatherData = await response.json();

    setTimeout(() => {
      logMessage("4️⃣ setTimeout (Macrotask)");
    }, 0);

    if (weatherData.cod == 200) {
      container.innerHTML = `
        <h3>Weather Info</h3>
        <p>City: ${weatherData.name}</p>
        <p>Temp: ${weatherData.main.temp.toFixed(1)}°C</p>
        <p>Weather: ${weatherData.weather[0].main}</p>
        <p>Humidity: ${weatherData.main.humidity}</p>
        <p>Wind: ${weatherData.wind.speed} m/s</p>
      `;

      logMessage("[ASYNC] Data received");

      if (!visitedCities.includes(cityName)) {
        visitedCities.push(cityName);
        localStorage.setItem("visitedCities", JSON.stringify(visitedCities));
      }

      showHistory();
    } else {
      container.innerHTML = `
        <h3>Weather Info</h3>
        <p>${weatherData.message}</p>
      `;
      logMessage("❌ API Error: " + weatherData.message);
    }
  } catch (e) {
    console.log(e);
    logMessage("❌ Network Error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = city.value.trim().toLowerCase();

  if (data) {
    searchWeather(data);
  }
});

function showHistory() {
  history.innerHTML = "";

  const cities = JSON.parse(localStorage.getItem("visitedCities")) || [];

  cities.forEach((cityName) => {
    if (typeof cityName !== "string") return;

    const btn = document.createElement("button");
    btn.textContent = cityName;

    btn.addEventListener("click", () => {
      searchWeather(cityName);
    });

    history.appendChild(btn);
  });
}

showHistory();
//now we have a weather app that fetches data from OpenWeatherMap API and displays it. It also keeps track of visited cities and allows users to click on them to fetch weather data again. The console box logs the flow of asynchronous operations, demonstrating how JavaScript handles async tasks with promises and the event loop.
// Note: Remember to replace the API key with your own from OpenWeatherMap for the app to work.
// This code is a simple weather application that allows users to search for the current weather in a city. It uses the OpenWeatherMap API to fetch weather data and displays it on the page. The application also keeps track of previously searched cities and allows users to click on them to fetch the weather data again. Additionally, it logs the flow of asynchronous operations in a console box to demonstrate how JavaScript handles async tasks with promises and the event loop.