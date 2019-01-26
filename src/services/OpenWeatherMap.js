import { API_KEY } from '../common/WeatherAPIKey';
import { $http } from './Http';

export const OpenWeatherMap = {
  get: (lat, lon) => {
    return $http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`);
  },
}