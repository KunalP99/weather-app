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

  // Gets the current position of the user using geolocation latitude and logitude
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

    fetch(base)
      .then((response) => response.json())
      .then((data) => {
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

// Gets the location of the location the user inputs
function getUserInputLocation() {
  const form = document.getElementById('form');
  const userInput = document.getElementById('city');
  const errorMsg = document.querySelector('.error-msg');
  const api = 'dd190da1025e91ba1feede45a0752686';
  let userValue;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    userValue = userInput.value;

    const base = `https://api.openweathermap.org/data/2.5/weather?q=${userValue}&appid=${api}&units=metric`;

    fetch(base)
      .then((response) => response.json())
      .then((data) => {
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
        userInput.value = '';
        errorMsg.style.visibility = 'hidden';
      })
      .catch((error) => {
        errorMsg.style.visibility = 'visible';
        console.log(error);
        console.log('This place does not exist');
      });
  });
}
