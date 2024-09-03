import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Dialog from 'react-native-dialog';
import { NativeBaseProvider, Text, Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherCardList } from './components/WeatherCardList';
import { WeatherInfo } from './components/WeatherCard';
import { getAllWeatherData, getWeatherDataByCityName } from './api';

const STORAGE_KEYS = {
  CITIES: 'cities',
};

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [weatherList, setWeatherList] = useState<WeatherInfo[]>([]);

  const hideModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);

  const addCity = () => {
    if (newCityName.trim() === '') {
      Alert.alert('Invalid city name', 'Enter a city name', [
        { text: 'OK' },
      ]);
      return;
    }

    hideModal();
    setNewCityName('');

    const newCities = [newCityName, ...cities];
    setCities(newCities);
    AsyncStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(newCities));
  };

  const removeCity = (cityName: string) => {
    setCities(cities.filter((city) => city !== cityName));
    setWeatherList(
      weatherList.filter((weather) => weather.savedCityName !== cityName)
    );
  };

  const reloadWeatherDataByCityName = (cityName: string) => {
    getWeatherDataByCityName(cityName).then((weatherData) => {
      if (weatherData.cod === 200) {
        weatherData.savedCityName = cityName;
        weatherData.id = Math.random();
        setWeatherList(
          weatherList.map((weather) =>
            weather.savedCityName === cityName ? weatherData : weather
          )
        );
      }
    });
  };

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.CITIES).then((storedCities) => {
      const savedCities = JSON.parse(storedCities || '[]');
      if (storedCities && savedCities !== null) {
        setCities(savedCities);
      }
    });
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      getAllWeatherData(cities).then(({ weatherData, validCities }) => {
        setWeatherList(weatherData);
        if (validCities.length !== cities.length) {
          setCities(validCities);
          AsyncStorage.setItem(
            STORAGE_KEYS.CITIES,
            JSON.stringify(validCities)
          );
        }
      });
    }
  }, [cities]);

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />

        <Dialog.Container visible={modalVisible} onBackdropPress={hideModal}>
          <Dialog.Title>Add a new city</Dialog.Title>
          <View>
            <TextInput
              onChangeText={setNewCityName}
              placeholder="Type city name here"
            />
          </View>
          <Dialog.Button label="Cancel" onPress={hideModal} />
          <Dialog.Button label="Add" onPress={addCity} />
        </Dialog.Container>
        <View style={styles.header}>
          <Text style={styles.appName}>Weather App</Text>
          <Button onPress={showModal}>Add City</Button>
        </View>
        {weatherList.length !== 0 ? (
          <WeatherCardList
            weatherList={weatherList}
            handleDelete={(cityName: string) => removeCity(cityName)}
            handleReload={(cityName: string) => reloadWeatherDataByCityName(cityName)}
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'black', paddingVertical: 20 }}>
              Add city to see weather info
            </Text>
          </View>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#333333',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default App;
