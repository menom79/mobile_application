import {WeatherInfo} from './components/WeatherCard';

const API_KEY = '32761e142c0e6ff75a56941d01e0cbb6';

const getWeatherSearchUrlByCityName = (
  cityName: string,
  units = 'metric',
  api_key = API_KEY,
) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${api_key}`;

export const getIconUrl = (icon: string, large = true) =>
  `https://openweathermap.org/img/wn/${icon}${large ? '@2x' : ''}.png`;

export const getWeatherDataByCityName = async (cityName: string) => {
  let response = await fetch(getWeatherSearchUrlByCityName(cityName));
  let json = await response.json();
  return json;
};

export const getAllWeatherData = async (cityNames: string[]) => {
  let weatherData = await Promise.all(
    cityNames.map(city =>
      fetch(getWeatherSearchUrlByCityName(city)).then(
        (res): WeatherInfo => res.json(),
      ),
    ),
  );

  let cleanedWeatherData = [];
  let validCities = [];
  for (let i = 0; i < weatherData.length; i++) {
    if (weatherData[i].cod === 200) {
      weatherData[i].savedCityName = cityNames[i];
      weatherData[i].id = Math.random();
      cleanedWeatherData.push(weatherData[i]);
      validCities.push(cityNames[i]);
    }
  }
  return {weatherData: cleanedWeatherData, validCities};
};
