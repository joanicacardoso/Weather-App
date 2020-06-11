// Set local time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${days[now.getDay()]}, ${
  months[now.getMonth()]
} ${now.getDate()}</br>${now.getHours()}:${now.getMinutes()}`;

// Set City

function changeCity(event) {
  event.preventDefault();
  let localCity = document.querySelector("#city");
  let newcity = document.querySelector("#city-input");
  localCity.innerHTML = newcity.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

// Change temperature units

function convertCel() {
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = 25;
}
function convertFah() {
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = 77;
}

let celsius = document.querySelector("#btn-cel");
celsius.addEventListener("click", convertCel);

let fahr = document.querySelector("#btn-fah");
fahr.addEventListener("click", convertFah);
