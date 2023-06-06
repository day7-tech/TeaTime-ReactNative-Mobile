import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ProfileScreen from "../features/profile/containers/ProfileScreen";
import { ROUTE_PROFILE_SCREEN, ROUTE_SETTINGS } from "./RouteNames";
import SettingScreen from "../features/profile/containers/SettingScreen";

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProfileScreen}
        name={ROUTE_PROFILE_SCREEN}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen component={SettingScreen} name={ROUTE_SETTINGS} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({
  settingsButton: {
    marginRight: 15,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
});
