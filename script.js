const API_KEY = "0133cc5316757ac730cc46ae342334e4"
const city = document.querySelector("#city")
const search = document.querySelector("#search")

search.addEventListener('click', async (e) => {
    e.preventDefault()
    const data = city.value
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_KEY}`)
    const weatherData = await response.json()
    console.log(weatherData)
    
    if (weatherData.cod === 200) {
        container.innerHTML = `<p>City: ${weatherData.name}</p>
        <p>Temp: ${(weatherData.main.temp - 273).toFixed(1)}C</p>
        <p>Weather: ${weatherData.weather[0].main}</p>
        <p>Humidity: ${weatherData.main.humidity}</p>
        <p>Wind: ${weatherData.wind.speed} miles/hr</p>`
    }
    else {
        container.innerHTML = `<h3>Weather Info</h3>
        <p>${weatherData.name}</p>`
    }
    
    }catch (e) {
    console.log(e)
    }

})