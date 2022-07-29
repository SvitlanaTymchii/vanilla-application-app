//current date
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = [
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
  "Nowember",
  "December",
];

let now = new Date(); // нова змінна формату дати
let currentDate = document.querySelector("#current-date"); //шукаємо, де її розмістити
let currentDay = days[now.getDay()];
let currentMonth = month[now.getMonth()];
let currentDat = now.getDate();
let currentHours = now.getHours();
let currentMin = now.getMinutes();
if (currentMin < 10) {
  currentMin = "0" + currentMin;
}
currentDate.innerHTML = `${currentDay}, ${currentMonth}, ${currentDat}, 
${currentHours}:${currentMin}  `;

// current temperature

function showTemperatureLocation(response) {
  //функція виводить температуру по поточній локації (координати чи назва міста)
  let currentTemperature = document.querySelector("#current-temperature");
  let currentLocation = document.querySelector("#current-location");
  let descriptionElement = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let speed = document.querySelector("#speed");
  let iconElement = document.querySelector("#icon");

  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}° `;
  currentLocation.innerHTML = `${response.data.name}`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  speed.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// пошук по натисканню кнопки Search
function city(position) {
  let cityName = document.querySelector("#cityname-input");
  let city = cityName.value;
  // console.log(`${city}`);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperatureLocation);
}

//form
function stopClear(event) {
  event.preventDefault(); //вже не перезавантажується сторінка
  navigator.geolocation.getCurrentPosition(city);
}

let apiKey = "92dec7e2931d37f76f7ea0cca649963a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(showTemperatureLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", stopClear); // шукаємо сабміт форми
