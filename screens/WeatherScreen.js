import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "0290ba052ff6eb22d40946da221198c8";
let url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${API_KEY}`;

const WeatherScreen = () => {
  const [forecast, setForecast] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);

  // const loadForecast = async () => {
  //   setRefreshing(true);
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     console.error("Permission to access location was denied");
  //     return;
  //   }
  //   let location = await Location.getCurrentPositionAsync({
  //     enableHighAccuracy: true,
  //   });
  //   const response = await fetch(
  //     `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
  //   );
  //   const data = await response.json();
  //   if (!response) {
  //     console.error("Something went wrong");
  //     return;
  //   } else {
  //     setForecast(data);
  //     setRefreshing(false); // stop refreshing
  //   }
  // };

  // useEffect(() => {
  //   loadForecast();
  // }, []);

  // if (refreshing) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  useEffect(() => {
    const fetchData = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      const response = await axios.get(
        `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      );
      setForecast(response.data.list.slice(0, 24));
    };
    fetchData();
  }, []);

  return (
    <ScrollView>
      {forecast.map((item, index) => (
        <View key={index} style={styles.hourlyForecast}>
          <Text style={styles.time}>
            {new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={styles.temperature}>{item.main.temp}°C</Text>
          <Text style={styles.state}>{item.weather[0].description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  chourlyForecast: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
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
  state: {
    fontSize: 18,
    marginBottom: 10,
  },
});
