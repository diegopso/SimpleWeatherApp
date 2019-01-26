import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Weather from './src/components/Weather';
import { $gps } from './src/services/Gps';
import { OpenWeatherMap } from './src/services/OpenWeatherMap';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    $gps.get().then((position) => {
      this.fetchWeather(position.coords.latitude, position.coords.longitude);
    }, (error) => {
      this.setState({
        error: 'Error Gettig Weather Condtions'
      });
    });
  }

  fetchWeather(lat=25, lon=25) {
    OpenWeatherMap.get(lat, lon).then((response) => {
      this.setState({
        temperature: Math.round(response.main.temp),
        weatherCondition: response.weather[0].main,
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
