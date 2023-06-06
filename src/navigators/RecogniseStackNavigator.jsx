import { Easing, StyleSheet, Text, View } from "react-native";
import React from "react";
import SendRecognitionSticker from "../features/recognition/containers/SendRecognitionSticker";
import SendRecognitionSuccess from "../features/recognition/containers/SendRecognitionSuccess";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ROUTE_RECOGNITION_STICKER_SCREEN,
  ROUTE_RECOGNITION_SUCCESS_SCREEN,
} from "./RouteNames";
import {
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

// RecogniseStackNavigator component
// Renders a stack navigator with screens for recognition sticker and success
// Returns: a stack navigator for recognition screens
const RecogniseStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={SendRecognitionSticker}
        name={ROUTE_RECOGNITION_STICKER_SCREEN}
      />
      <Stack.Screen
        component={SendRecognitionSuccess}
        name={ROUTE_RECOGNITION_SUCCESS_SCREEN}
      />
    </Stack.Navigator>
  );
};

export default RecogniseStackNavigator;

const styles = StyleSheet.create({});
