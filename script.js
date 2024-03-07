const weatherCard = document.getElementById("weatherCard")
const info = document.getElementById("info")
const place = document.getElementById("place")
const temperatureItem = document.getElementById("temperature")
const wind = document.getElementById("wind")
const forecast = document.getElementById("forecast")
console.log(forecast)

async function loadWeather() {
  const res = await fetch("https://get.geojs.io/v1/ip/geo.json")
  const obj = await res.json()
  const { latitude, longitude, city, country } = obj
  console.log(latitude, longitude, city)

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  )
  
  const data = await response.json()
  const { current_weather } = data
  const { windspeed, winddirection, weathercode, temperature } = current_weather
  forecast.textContent = getWeatherDesc(weathercode)
  info.textContent = "Our forecast is: "

  place.textContent = `${city}, ${country}`
  temperatureItem.textContent =
    temperature + " " + data.current_weather_units.temperature
  wind.textContent = windspeed + " " + data.current_weather_units.windspeed

  function getWeatherDesc(code) {
    switch (code) {
      case 0:
        return "Clear sky"
      case 1:
        return "Mainly clear,"
      case 2:
        return "Partly cloudy"
      case 3:
        return "Overcast"
      case 45:
        return "Fog"
      case 48:
        return "Depositing rime fog"
      case 51:
        return "Light drizzle"
      case 53:
        return "Moderate drizzle"
      case 55:
        return "Dense intensity drizzle"
      case 56:
        return "Light freezing Drizzle"
      case 57:
        return "Dense intensity Freezing Drizzle"
      case 61:
        return "Slight rain"
      case 63:
        return "Moderate rain"
      case 65:
        return "Heavy intensity rain"
      case 66:
        return "Light Freezing Rain"
      case 67:
        return "Heavy Freezing Rain"
      case 71:
        return "Slight Snow fall"
      case 73:
        return "Moderate Snow fall"
      case 75:
        return "Heavy Snow fall"
      case 77:
        return "Snow grains"
      case 80:
        return "Slight Rain showers"
      case 81:
        return "Moderate Rain showers"
      case 82:
        return "Violent Rain showers"
      case 85:
        return "Slight Snow showers"
      case 86:
        return "Heavy Snow showers"
      case 95:
        return "Thunderstorm moderate"
      case 96:
        return "Thunderstorm slight"
      case 99:
        return "Thunderstorm slight"
    }
  }

  // выведите данные на странице в html элементах
  // сделайте div карточку с информацией:

  // о городе, стране
  // выведите расшифровку weathercode
  // укажите скорость ветра
  // температуру

  // ! 20:15
}

loadWeather()