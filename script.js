document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "bb2a576e88c408bd0fbc17be6470e6e6";
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const unsplashAccessKey = "T9NkeNbp3SDJWohh7f8QBAjg_5M4ykkMqFhNCAfGpKg";
    const unsplashApiUrl = "https://api.unsplash.com/search/photos/";
  
    async function checkWeather(city) {
      try {
        const unsplashResponse = await fetch(
          `${unsplashApiUrl}?query=${city}&client_id=${unsplashAccessKey}`
        );
        if (unsplashResponse.ok) {
          const imageData = await unsplashResponse.json();
          const firstPhoto =
            imageData.results && imageData.results.length > 0
              ? imageData.results[0]
              : null;
  
          if (firstPhoto) {
            document.querySelector(".city-image").src = firstPhoto.urls.regular;
          } else {
            document.querySelector(".city-image").src = "new-york.png";
          }
        } else {
          document.querySelector(".city-image").src = "new-york.png";
        }
  
        const weatherResponse = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await weatherResponse.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  
        if (data.weather[0].main == "Clouds") {
          document.querySelector(".weather-icon").src = "images/clouds.png";
        } else if (data.weather[0].main == "Rain") {
          document.querySelector(".weather-icon").src = "images/rain.png";
        } else if (data.weather[0].main == "Clear") {
          document.querySelector(".weather-icon").src = "images/clear.png";
        } else if (data.weather[0].main == "Snow") {
          document.querySelector(".weather-icon").src = "images/snow.png";
        } else if (data.weather[0].main == "Thunderstorm") {
          document.querySelector(".weather-icon").src = "images/storm.png";
        } else if (data.weather[0].main == "Drizzle") {
          document.querySelector(".weather-icon").src = "images/drizzle.png";
        } else {
          document.querySelector(".weather-icon").src = "images/clear.png";
        }
  
        document.querySelector(".weather").style.display = "block";
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  
    searchBtn.addEventListener("click", function () {
      checkWeather(searchBox.value);
    });
  });
  