const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const error404 = document.querySelector(".not-found");
const weatherDetails = document.querySelector(".weather-details");
const inputSearch = document.querySelector("#input-search");



search.addEventListener("click",() => {
    const apiKey = '7a31bc476a0b55b4ff7f39dde7a30a0c'
    const city = document.querySelector(".search-box input").value;


    if (city === '' ) 
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(response => response.json()).then(function seeker(json) {
        if (json.cod === '404') {
            container.style.height = '340px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none'
            error404.style.display = 'block';

            error404.classList.add("fadeIn");
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove("fadeIn");

        const image = document.querySelector(".weather-box img")
        const temperature = document.querySelector(".weather-box .temperature")
        const description = document.querySelector(".weather-box .description")
        const windSpeed = document.querySelector(".wind-speed")
        const humidity = document.querySelector(".humidity")

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = '/images/clear.png';
                break;

            case 'Rain':
                image.src = '/images/rain.png';
                break;

            case 'Snow':
                image.src = '/images/snow.png';
                break;

            case 'Clouds':
                image.src = '/images/clouds.png';
                break;

            case 'Haze':
                image.src = '/images/haze.png';
                break;
            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        humidity.innerHTML = `${json.main.humidity}%`
        windSpeed.innerHTML = `${parseInt(json.wind.speed)}Km/h`
        description.innerHTML = `${json.weather[0].description}`;

        weatherBox.style.display = ''
        weatherBox.classList.add("fadeIn")
        container.style.height = '530px';
        weatherBox.style.display = '';
        weatherDetails.style.display = ''
    })
})
