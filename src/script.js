// Set local time (old)

/*function formatDate(date) {
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = date.getMonth();
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

  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${days[day]}, ${
    months[month]
  } ${now.getDate()}</br>${hours}:${minutes}`;
}

let now = new Date();
let currentDate = document.querySelector("#date");
currentDate.innerHTML = formatDate(now);
*/

// Set local time - NEW!!

function formatDate(timestamp) {
  let currentdate = new Date(timestamp);
  let date = currentdate.getDate();
  let hours = currentdate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentdate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentdate.getDay()];
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
  let month = months[currentdate.getMonth()];
  return `${day}, ${month} ${date}</br>${hours}:${minutes}`;
}

//Search Engine

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  savedTemperature = Math.round(response.data.main.temp);
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "48f466c2eeef74f8d4b3c29e67806457";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchCity);

let savedTemperature = 0;

//Current location

let buttonCurrentLocation = document.querySelector("#current-location-btn");

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "48f466c2eeef74f8d4b3c29e67806457";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

buttonCurrentLocation.addEventListener("click", getPosition);

// Change temperature units - WIP

function convertCel(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  let units = document.querySelector("#units");
  currentTemp.innerHTML = Math.round(celsiusTemp);
  units.innerHTML = ` ºC`;
}

function convertFah(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  let fTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fTemp);
  let units = document.querySelector("#units");
  units.innerHTML = ` ºF`;
  //add active class from celsius
  // celsiusTemp.classList.add(".active");
}

let celsiusTemp = null;

let fahrButton = document.querySelector("#btn-fah");
fahrButton.addEventListener("click", convertFah);

let celsiusButton = document.querySelector("#btn-cel");
celsiusButton.addEventListener("click", convertCel);

/* 5 days forecast - WIP
function showDaysForecast(response) {
  /*let minDay1 = document.querySelector("#min-day1");
  let minDay2 = document.querySelector("#min-day2");
  let minDay3 = document.querySelector("#min-day3");
  let minDay4 = document.querySelector("#min-day4");
  let minDay5 = document.querySelector("#min-day5");
  let maxDay1 = document.querySelector("#max-day1");
  let maxDay2 = document.querySelector("#max-day2");
  let maxDay3 = document.querySelector("#max-day3");
  let maxDay4 = document.querySelector("#max-day4");
  let maxDay5 = document.querySelector("#max-day5");
  minDay1.innerHTML = response.data.name;

  console.log(response.data.forecast);
}

/*let apiUrlDays = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${
    cityInput.value
  }&cnt=5&appid=${apiKey}`;
  axios.get(apiUrlDays).then(showDaysForecast);
*/

search("Lisbon");
