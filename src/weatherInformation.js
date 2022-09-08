export default function weatherInfo() {
  getLocation();
}

async function getLocation() {
  let lat;
  let lon;
  const api = 'dd190da1025e91ba1feede45a0752686';

  const weatherIcon = document.querySelector('.weather-icon');
  const cityElement = document.getElementById('location');
  const tempElement = document.getElementById('temp');
  const windElement = document.getElementById('wind-speed');
  const humidityElement = document.getElementById('humidity');
  const feelsLikeElement = document.getElementById('feels-like');

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

    fetch(base)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { temp } = data.main;
        const windSpeed = data.wind.speed;
        const { humidity } = data.main;
        const feelsLike = data.main.feels_like;

        // const farenehit = 1.8 * (temp - 273.15) + 32;

        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        tempElement.textContent = `${Math.round(temp)} °C`;
        cityElement.textContent = data.name;
        windElement.textContent = `${windSpeed} m/s`;
        humidityElement.textContent = `${humidity}%`;
        feelsLikeElement.textContent = `${feelsLike} °C`;
      });
  });
}
