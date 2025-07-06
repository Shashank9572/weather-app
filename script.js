// async function getWeather() {
//   const city = document.getElementById("cityInput").value.trim();
//   const apiKey = "6fca284281654b54bd670456252005";
//   const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

//   const weatherBox = document.getElementById("weatherResult");

//   if (city === "") {
//     weatherBox.innerHTML = "<p>Please enter a city name.</p>";
//     weatherBox.style.display = "block";
//     return;
//   }

//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error("City not found");

//     const data = await response.json();

//     weatherBox.innerHTML = `
//       <h2>${data.location.name}, ${data.location.country}</h2>
//       <img src="https:${data.current.condition.icon}" alt="icon" />
//       <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
//       <p><strong>Condition:</strong> ${data.current.condition.text}</p>
//       <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
//       <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
//     `;
//     weatherBox.style.display = "block";
//   } catch (error) {
//     weatherBox.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
//     weatherBox.style.display = "block";
//   }
// }
let isCelsius = true;
let lastWeatherData = null;

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "6fca284281654b54bd670456252005";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  const weatherBox = document.getElementById("weatherResult");

  // Clear previous results and show loading
  weatherBox.innerHTML = "<p>Loading...</p>";
  weatherBox.style.display = "block";

  if (city === "") {
    weatherBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    lastWeatherData = data; // Save for unit toggle

    renderWeather(data, isCelsius);
  } catch (error) {
    weatherBox.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

// Render weather info with unit toggle
function renderWeather(data, celsius = true) {
  const weatherBox = document.getElementById("weatherResult");
  const temp = celsius ? `${data.current.temp_c}°C` : `${data.current.temp_f}°F`;
  const toggleText = celsius ? "Show °F" : "Show °C";

  weatherBox.innerHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <img src="https:${data.current.condition.icon}" alt="icon" />
    <p><strong>Temperature:</strong> <span id="tempValue">${temp}</span></p>
    <button id="toggleUnitBtn">${toggleText}</button>
    <p><strong>Condition:</strong> ${data.current.condition.text}</p>
    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
    <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
  `;

  document.getElementById("toggleUnitBtn").onclick = () => {
    isCelsius = !isCelsius;
    renderWeather(data, isCelsius);
  };
}

// Support Enter key for search
document.getElementById("cityInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});