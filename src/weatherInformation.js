export default function weatherInfo() {
  getLocation();
  getUserInputLocation();
}

const domElements = (icon, temp, cityName, windSpeed, humidity, feelsLike) => {
  const weatherIcon = document.querySelector('.weather-icon');
  const cityElement = document.getElementById('location');
  const tempElement = document.getElementById('temp');
  const windElement = document.getElementById('wind-speed');
  const humidityElement = document.getElementById('humidity');
  const feelsLikeElement = document.getElementById('feels-like');

  weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  tempElement.textContent = `${Math.round(temp)} °C`;
  cityElement.textContent = cityName;
  windElement.textContent = `${windSpeed} m/s`;
  humidityElement.textContent = `${humidity}%`;
  feelsLikeElement.textContent = `${feelsLike} °C`;
};

async function getLocation() {
  let lat;
  let lon;
  const api = 'dd190da1025e91ba1feede45a0752686';

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

    fetch(base)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const { temp } = data.main;
        const windSpeed = data.wind.speed;
        const { humidity } = data.main;
        const feelsLike = data.main.feels_like;

        domElements(
          data.weather[0].icon,
          temp,
          data.name,
          windSpeed,
          humidity,
          feelsLike
        );
      });
  });
}

function getUserInputLocation() {
  const form = document.getElementById('form');
  const userInput = document.getElementById('city');
  const api = 'dd190da1025e91ba1feede45a0752686';
  let userValue;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    userValue = userInput.value;
    const base = `https://api.openweathermap.org/data/2.5/weather?q=${userValue}&appid=${api}&units=metric`;
    fetch(base)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const { temp } = data.main;
        const windSpeed = data.wind.speed;
        const { humidity } = data.main;
        const feelsLike = data.main.feels_like;

        domElements(
          data.weather[0].icon,
          temp,
          data.name,
          windSpeed,
          humidity,
          feelsLike
        );
      })
      .catch((error) => {
        console.log('This place does not exist');
      });
  });
}
