import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, View } from "react-native";
import { auth } from "../firebaseConfig";
import Button from "../components/Button";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    // center the content in the middle of the screen
    <View className="flex-1 justify-center align-center">
      <Text>Email: {auth.currentUser?.email}</Text>
      <Button
        label="Sign out"
        onPress={() => {
          navigation.navigate("Clothes");
        }}
      />
      <Button
        label="Weather"
        onPress={() => {
          navigation.navigate("Weather");
        }}
      />
      <Button label="Clothes" onPress={handleSignOut} />
    </View>
  );
};

export default HomeScreen;
