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
  
  let formElement = document.querySelector("#form");
  formElement.addEventListener("submit", handleSearchSubmit);  
  