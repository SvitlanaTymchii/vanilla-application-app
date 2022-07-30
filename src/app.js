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

function showAll(response) {
  //функція виводить температуру по поточній локації (координати чи назва міста)
  let currentTemperature = document.querySelector("#current-temperature"); //знаходим на сторінці елемент  для виведення температури
  let currentLocation = document.querySelector("#current-location"); // елемент для виведення поточноі локаціі
  let descriptionElement = document.querySelector("#description"); // елемент для опису погоди
  let humidity = document.querySelector("#humidity"); //елемент вологість
  let speed = document.querySelector("#speed"); // елемент куди виводиться швидкість вітру
  let iconElement = document.querySelector("#icon"); // картинка погоди

  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}° `; // підхоплюємо з АПІ температуру і виводимо
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
}

// пошук по натисканню кнопки Search
/*function cityPos(position) {
  let cityName = document.querySelector("#cityname-input");
  let city = cityName.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showAll);
}*/

//form
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
