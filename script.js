// fetch('https://api.openweathermap.org/data/2.5/weather?q=california&appid=b3d9640f25d425e0f0a964b9b675042d')
// .then((response) => response.json())
// .then((ele) => console.log(ele))
const cityName = document.getElementById('cityName')
const search = document.getElementById('search')

const city = document.getElementById('city')
const weatherEmoji = document.getElementById('weatherEmoji')
const temperature = document.getElementById('temperature')
const humidity = document.getElementById('humidity')
const weather = document.getElementById('weather')

let data = {
    city : '',
    weatherEmoji : '',
    temperature : '',
    humidity : '',
    weather : ''
}
let url;
search.addEventListener('click', () =>
{
    data = {
    city : '',
    weatherEmoji : '',
    temperature : '',
    humidity : '',
    weather : ''}
    
    data.city = cityName.value
    console.log(data)
    url = `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=b3d9640f25d425e0f0a964b9b675042d`
    searchWeather(makeChanges)
})

async function searchWeather(callback){
    let apiData
    try{
        const p = await fetch(url)
        apiData = await p.json()
        // console.log(apiData)
    }
    catch(error)
    {console.log(error)}
try{
    data.temperature = `${(Math.round(apiData.main.temp - 273.13)).toString()}°C`
    data.humidity = `${(apiData.main.humidity).toString()}%`
    data.weather = `${apiData.weather[0].description}`
    // console.log(data)
    switch(apiData.weather[0].main)
{
    case "Clear":
        data.weatherEmoji = "☀️ Clear Sky";
        break;

    case "Clouds":
        data.weatherEmoji = "☁️ Cloudy";
        break;

    case "Rain":
        data.weatherEmoji = "🌧️ Rainy";
        break;

    case "Drizzle":
        data.weatherEmoji = "🌦️ Drizzle";
        break;

    case "Thunderstorm":
        data.weatherEmoji = "⛈️ Thunderstorm";
        break;

    case "Snow":
        data.weatherEmoji = "❄️ Snow";
        break;

    case "Mist":
    case "Fog":
    case "Haze":
        data.weatherEmoji = "🌫️ Low Visibility";
        break;

    case "Smoke":
        data.weatherEmoji = "🚬 Smoky";
        break;

    case "Dust":
    case "Sand":
        data.weatherEmoji = "🏜️ Dusty";
        break;

    case "Squall":
        data.weatherEmoji = "💨 Strong Winds";
        break;

    case "Tornado":
        data.weatherEmoji = "🌪️ Tornado";
        break;

    default:
        data.weatherEmoji = "🌍 Unknown Weather";
}}
catch(error){
    console.log(error)
    city.style.fontSize = '1.5rem'
    city.textContent = 'You entered wrong input'
    setTimeout(() => {cityName.value = '';
        city.style.fontSize = '2.5rem';
        city.textContent = 'City/Country';
    }, 3000)
    return
}
    callback()
}

function makeChanges(){
    city.textContent = data.city.toUpperCase()
    weatherEmoji.textContent = data.weatherEmoji
    temperature.textContent = `Temperature : ${data.temperature}`
    humidity.textContent = `Humidity : ${data.humidity}`
    weather.textContent = data.weather
    cityName.value = ''
}

