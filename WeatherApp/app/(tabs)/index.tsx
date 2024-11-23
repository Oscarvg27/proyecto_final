import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useWeatherContext } from '@/hooks/WeatherContext';

export default function Index() {
  const [city, setCity] = useState<string>('');
  const { weather, setWeather } = useWeatherContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const API_KEY = '0a6aaac2719a4ba28368c73c4e8084d8';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setErrorMessage('Por favor, ingresa una ciudad válida.');
      setWeather(null);
      return;
    }
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeather(response.data);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage('Hubo un problema al obtener el clima. Intenta de nuevo.');
      setWeather(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌦️ Clima en tu Ciudad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa la ciudad"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Buscar ☁️</Text>
      </TouchableOpacity>
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      {weather && (
        <View style={styles.resultsContainer}>
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Ciudad</Text>
            <Text style={styles.resultValue}>{weather.name}, {weather.sys.country}</Text>
          </View>
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Temperatura</Text>
            <Text style={styles.resultValue}>{weather.main.temp}°C</Text>
          </View>
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Condición</Text>
            <Text style={styles.resultValue}>{weather.weather[0].description}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  resultsContainer: {
    width: '80%',
    marginTop: 20,
  },
  resultBox: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  resultValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004d40',
    marginTop: 5,
  },
});
