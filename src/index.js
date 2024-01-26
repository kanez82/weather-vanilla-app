function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.date.time * 1000);
    let iconElement = document.querySelector("#icon");
  
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;

    getForecast(response.data.city);
  }
  
   
     
  function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function searchCity(city) {
    let apiKey = "4of5564b133542e414ea78cf60tfb23d";
    let metric = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${metric}`;
    axios.get(apiUrl).then(refreshWeather);
  
  }  
  
function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
  }

  function formatDay(timestamp){
   let date = new Date(timestamp * 1000);
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

   return days[date.getDay()];
  }
  function getForecast(city){
   let apiKey = "4of5564b133542e414ea78cf60tfb23d";
   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
   axios(apiUrl).then(displayForecast);
  }
  function displayForecast(response){
   
    let forecastHtml ="";

   response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =  forecastHtml + `
      <div class="col-2">
                      <div class="weather-forecast-date">${formatDay(day.time)}</div>
                      
                      <img src="${day.condition.icon_url}" class="weather-forecast-icon">
                      
                      <div class="weather-forecast-temperatures"> 
                      <span class="weather-forecast-temperature-max"><strong>${Math.round(day.temperature.maximum)}°</strong></span>
                      <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
                      </div>
                      </div>
                      `; 
                    }           
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  
                     
  let formElement = document.querySelector("#form");
  formElement.addEventListener("submit", handleSearchSubmit);  


 