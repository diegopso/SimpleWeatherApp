import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Weather from './components/Weather';
import { API_KEY } from './common/WeatherAPIKey';
import { $http } from './services/Http';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log(error);
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    $http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state;
     return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather</Text>
        ) : (
          <View>
            <Weather weather={weatherCondition} temperature={temperature} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },
});
