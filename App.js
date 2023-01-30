import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ClothesScreen from "./screens/ClothesScreen";
import WeatherScreen from "./screens/WeatherScreen";
import WeatherScreen2 from "./screens/WeatherScreen2";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ title: "Login Page" }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ title: "Home Page" }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Clothes" component={ClothesScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
