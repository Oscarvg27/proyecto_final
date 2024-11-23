import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useWeatherContext } from '@/hooks/WeatherContext';

export default function Explore() {
  const { weather } = useWeatherContext();

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No hay datos cargados. Busca una ciudad en la pantalla principal.</Text>
      </View>
    );
  }

  const { name, sys, main, wind, clouds, visibility, weather: weatherDesc } = weather;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}, {sys.country}</Text>
      <View style={styles.detailBox}>
        <Text style={styles.detailTitle}>🌡️ Temperatura:</Text>
        <Text style={styles.detailValue}>{main.temp}°C</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.detailTitle}>🌧️ Condición:</Text>
        <Text style={styles.detailValue}>{weatherDesc[0].description}</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.detailTitle}>💨 Viento:</Text>
        <Text style={styles.detailValue}>{wind.speed} m/s</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.detailTitle}>☁️ Nubes:</Text>
        <Text style={styles.detailValue}>{clouds.all}%</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.detailTitle}>🌫️ Humedad:</Text>
        <Text style={styles.detailValue}>{main.humidity}%</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.detailTitle}>🔭 Visibilidad:</Text>
        <Text style={styles.detailValue}>{visibility} m</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  detailBox: {
    width: '80%',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e0f7fa',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  detailValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004d40',
  },
  message: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});
