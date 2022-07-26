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
let celsiusTemperature = null;

function getForecast(coordinates) {
  console.log("HI, this is getforecast function!");
  let apiKey = "92dec7e2931d37f76f7ea0cca649963a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(`${apiUrl}`);
  axios.get(apiUrl).then(displayForecast);
}

function showAll(response) {
  //функція виводить температуру по поточній локації (координати чи назва міста)
  let currentTemperature = document.querySelector("#current-temperature"); //знаходим на сторінці елемент  для виведення температури
  let currentLocation = document.querySelector("#current-location"); // елемент для виведення поточноі локаціі
  let descriptionElement = document.querySelector("#description"); // елемент для опису погоди
  let humidity = document.querySelector("#humidity"); //елемент вологість
  let speed = document.querySelector("#speed"); // елемент куди виводиться швидкість вітру
  let iconElement = document.querySelector("#icon"); // картинка погоди

  celsiusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = `${Math.round(celsiusTemperature)}`; // підхоплюємо з АПІ температуру і виводимо
  currentLocation.innerHTML = `${response.data.name}`; // підтягуємо з бази назву міста
  descriptionElement.innerHTML = `${response.data.weather[0].description}`; // витягуємо опис погоди
  humidity.innerHTML = `${response.data.main.humidity}%`; // витягуємо і друкуємо про вологість
  speed.innerHTML = `${response.data.wind.speed}km/h`; // і про швидкість вітру
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` // міняємо атрибут посилання картинки на посилання на іконки в апі
  );
  iconElement.setAttribute("alt", ` response.data.weather[0].description`); // і те саме робимо з описом
  //????? Чи коректно тут працюэ альт????

  getForecast(response.data.coord); // для прогнозу погоди
}

function search(event) {
  event.preventDefault(); //вже не перезавантажується сторінка
  let cityName = document.querySelector("#cityname-input");
  let city = cityName.value;
  start(city);
}

function start(city) {
  let apiKey = "92dec7e2931d37f76f7ea0cca649963a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showAll); // хватаєм апі-юрл і витягуємо функцією showAll все, щ можемо
}

start("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", search); // шукаємо сабміт форми

//--------------------------------------------------

// пошук по натисканню кнопки Current Location

function retrievePosition(position) {
  let apiKey = "92dec7e2931d37f76f7ea0cca649963a";

  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showAll);
}
function currentLocation(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let buttonCurrentLocation = document.querySelector("#currentLocation");
buttonCurrentLocation.addEventListener("click", currentLocation);

// перевід в фарегейти

function displayFahrenhaitTemperature(event) {
  event.preventDefault(); //зупиняємо поведінку по замовчуванням()
  let temperatureElement = document.querySelector("#current-temperature");
  //remove the active class the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenhaitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenhaitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenhaitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  let temperatureElement = document.querySelector("#current-temperature");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log("Hi! this is displayForecast function");
  console.log("Це дані, з яких ми берем прогноз погоди", response); //Обієкт з апі з прогнозом погоди на тиждень
  let forecast = response.data.daily;
  console.log(
    "Це дані з поля daily. у нас це змінна forecast, масив обєктів",
    forecast
  );

  // forecast це масив об'єктів з даними про дату і температури

  let forecastElement = document.querySelector("#forecast"); // знаходим контейнер для розміщення прогнозу погоди
  let forecastHTML = `<div class = "row">`; // розміщуємо всередині контейнера ряд

  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastHTML =
        forecastHTML + // додаємо в цей ряд для кожого елемента дня тижня
        `    
        <div class = "col-2"> 

                <div class="weather-forecast-date">
                    ${formatDay(forecastDay.dt)}


                    </div>

                <img
                     src="http://openweathermap.org/img/wn/${
                       forecastDay.weather[0].icon
                     }@2x.png"
                     alt=""
                     width="42"
                      />
                      
                <div class = "weather-forecast-temperatures">
                  <span class = "weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )} °</span> 
                  <span class = "weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )} °</span>
                </div>

             
            </div>`;
    }
  });

  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
