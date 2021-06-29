export class UI {
  weatherInfo;

  constructor() {
    this.weatherInfo = document.getElementById('weather-info');
  }

  showLoading() {
    let loadingHtml = `
        <div class="loading text-center">
            <div class="spinner-border" role="status"></div>
        </div>
    `;

    this.weatherInfo.innerHTML = loadingHtml;
  }

  loadImage(url, element, desc) {
    return new Promise((resolve, reject) => {
      element.onload = () => resolve(element);
      element.onerror = reject;
      element.src = url;
      element.alt = 'weather icon for ' + desc;
    });
  }

  showWeatherData(weatherData) {
    const [tempFahrenheit, tempCelsius, feelsLikeFahrenheit, feelsLikeCelsius] =
      [
        this.convertKelvinTemp(weatherData.main.temp, 'fahrenheit'),
        this.convertKelvinTemp(weatherData.main.temp, 'celsius'),
        this.convertKelvinTemp(weatherData.main.feels_like, 'fahrenheit'),
        this.convertKelvinTemp(weatherData.main.feels_like, 'celsius'),
      ];

    const windDegrees = `${weatherData.wind.deg}deg`;

    document.documentElement.style.setProperty('--degrees', windDegrees);

    let weatherHtml = ` 
        <h1 class="display-6">${weatherData.name}, ${weatherData.sys.country}</h1>
        <div class="weather-card__details">
        <p class="text-capitalize">${weatherData.weather[0].description}</p>
        <p>${tempFahrenheit} &deg;F (${tempCelsius} &deg;C)</p>
        <div id="image" class="my-3 text-center">
            <div id="loading-image" class="spinner-border" role="status"></div>
        </div>
        </div>

        <ul class="list-group mb-3">
        <li class="list-group-item">Humidity:<span class="mx-2">${weatherData.main.humidity}%</span></li>
        <li class="list-group-item">Pressure:<span class="mx-2">${weatherData.main.pressure} hPa</span></li>
        <li class="list-group-item">Feels Like:<span class="mx-2">${feelsLikeFahrenheit} &deg;F (${feelsLikeCelsius} &deg;C)</span></li>
        <li class="list-group-item">Wind:<div class="direction ml-2">></div><span class="mx-2">${weatherData.wind.speed} mph</span></li>
        </ul>

        `;
    this.weatherInfo.innerHTML = weatherHtml;

    // Handle image loading ui
    const img = document.createElement('img');
    this.loadImage(
      `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      img,
      weatherData.weather[0].description
    ).then(element => {
      document.getElementById('loading-image').remove();
      document.getElementById('image').appendChild(element);
    });
  }

  convertKelvinTemp(temp, unit) {
    if (unit == null || (unit !== 'fahrenheit' && unit !== 'celsius')) return;
    if (unit === 'fahrenheit') {
      return Math.round(temp * (9 / 5) - 459.67);
    } else return Math.round(temp - 273.15);
  }
}
