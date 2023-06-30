import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '../features/profile/containers/ProfileScreen';
import {ROUTE_PROFILE_SCREEN} from './RouteNames';

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
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
