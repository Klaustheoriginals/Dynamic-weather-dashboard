document.getElementById("getWeatherBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function fetchWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,wind_speed_10m&timezone=auto`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temps = data.hourly.temperature_2m;
      const rain = data.hourly.rain;
      const wind = data.hourly.wind_speed_10m;

      document.getElementById("location").textContent = `Latitude: ${lat.toFixed(2)}, Longitude: ${lon.toFixed(2)}`;
      document.getElementById("temperature").textContent = `Temperature: ${temps[0]} °C`;
      document.getElementById("rain").textContent = `Rain: ${rain[0]} mm`;
      document.getElementById("wind").textContent = `Wind Speed: ${wind[0]} km/h`;
    })
    .catch(err => {
      alert("Error fetching weather data: " + err);
    });
}

function showError(error) {
  alert("Unable to retrieve your location.");
}
