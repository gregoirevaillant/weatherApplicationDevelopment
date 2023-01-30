import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";

export default function WeatherScreen2() {
  const [forecast, setForecast] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setLoading(true);
    setErrorMessage(null);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      setLoading(false);
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?units=metric&cnt=24&appid=0290ba052ff6eb22d40946da221198c8&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    if (!response) {
      setErrorMessage("Something went wrong");
      setLoading(false);
      return;
    }
    setForecast(response.data);
    setLoading(false);
  };

  const refreshForecast = async () => {
    setRefreshing(true);
    setErrorMessage(null);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      setRefreshing(false);
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?units=metric&cnt=24&appid=0290ba052ff6eb22d40946da221198c8&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    if (!response) {
      setErrorMessage("Something went wrong");
      setRefreshing(false);
      return;
    }
    setForecast(response.data);
    setRefreshing(false);
  };

  useEffect(() => {
    loadForecast();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather forecast</Text>
      {loading && <Text>Loading...</Text>}
      {errorMessage && <Text>{errorMessage}</Text>}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshForecast} />
        }
      >
        <FlatList
          horizontal
          data={forecast.hourly}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(hour) => {
            const weather = hour.item.weather[0];
            var dt = new Date(hour.item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <View style={styles.forecastContainer}>
                <Text style={styles.time}>{dt}</Text>
                <Text style={styles.temperature}>{hour.item.temp}°C</Text>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  forecastContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  time: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
