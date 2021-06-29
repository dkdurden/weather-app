import { Weather } from './weather.js';
import { UI } from './ui.js';

function initApp(ui, weather) {
  ui.showLoading();
  weather.get('new york', 'new york').then(res => {
    ui.showWeatherData(res);
  });
}

function main() {
  const ui = new UI();
  const weather = new Weather();

  initApp(ui, weather);

  document.getElementById('submit').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    ui.showLoading();

    weather.get(city, state).then(res => ui.showWeatherData(res));
  });
}

main();
