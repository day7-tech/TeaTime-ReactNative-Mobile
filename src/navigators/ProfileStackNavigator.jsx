import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import ProfileScreen from '../features/profile/containers/ProfileScreen';
import SettingScreen from '../features/profile/containers/SettingScreen';
import {ROUTE_PROFILE_SCREEN, ROUTE_SETTINGS} from './RouteNames';

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
