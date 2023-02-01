import { StyleSheet, View, Pressable, Text } from "react-native";
import React from "react";

const Button = ({ label }) => {
  return (
    <View>
      <Pressable>
        <Text className="bg-blue-500">{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
