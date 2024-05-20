const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

function getWeather() {
    const location = document.getElementById('locationInput').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            getForecast(data.coord.lat, data.coord.lon);
        })
        .catch(error => alert('Location not found!'));
}

function displayCurrentWeather(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayForecast(data));
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = ''; // Clear previous forecast

    data.hourly.slice(0, 12).forEach(hour => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div>${new Date(hour.dt * 1000).getHours()}:00</div>
            <div>${hour.temp}°C</div>
            <div>${hour.weather[0].description}</div>
        `;
        forecastDiv.appendChild(forecastItem);
    });
}


