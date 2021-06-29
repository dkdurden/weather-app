export class Weather {
  apiKey;

  constructor() {
    this.apiKey = 'api key here';
  }

  get(city, state) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${this.apiKey}`
    ).then(res => {
      if (!res.ok) throw new Error('The network response was not ok');
      return res.json();
    });
  }
}
