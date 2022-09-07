export default function weatherInfo() {
  getLocation();
}

async function getLocation() {
  let lat;
  let lon;
  const api = 'dd190da1025e91ba1feede45a0752686';

  const cityElement = document.getElementById('location');
  const tempElement = document.getElementById('temp');
  const weatherIcon = document.querySelector('.weather-icon');

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

    fetch(base)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        const { temp } = data.main;
        const celcius = temp - 273.15;
        // const farenehit = 1.8 * (temp - 273.15) + 32;

        tempElement.textContent = `${Math.round(celcius)} °C`;
        cityElement.textContent = data.name;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      });
  });
}
