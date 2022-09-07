// Updates the time every second and display it on screen
function updateTime() {
  const timeElement = document.getElementById('time');
  const currentTime = new Date();

  timeElement.textContent = currentTime.toLocaleTimeString();

  setTimeout(updateTime, 1000);
}

export default function header() {
  updateTime();
}
