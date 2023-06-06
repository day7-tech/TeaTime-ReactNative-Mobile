import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import SearchScreen from '../features/home/containers/SearchScreen';
import RecogniseStackNavigator from './RecogniseStackNavigator';
import {
  ROUTE_RECOGNITION_STACK_NAVIGATOR,
  ROUTE_SEARCH_SCREEN,
  ROUTE_TAB_NAVIGATOR,
  ROUTE_USER_DETAILS_STACK_NAVIGATOR,
} from './RouteNames';
import TabNavigator from './TabNavigator';
import UserDetailsStackNavigator from './UserDetailsStackNavigator';

const Stack = createNativeStackNavigator();

// AuthenticatedNavigator component
// Renders a stack navigator with multiple screens/components
// Returns: an authenticated navigator component
const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={TabNavigator}
        name={ROUTE_TAB_NAVIGATOR}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      {/* <Stack.Screen
        component={SearchScreen}
        name={ROUTE_SEARCH_SCREEN}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        component={RecogniseStackNavigator}
        name={ROUTE_RECOGNITION_STACK_NAVIGATOR}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        component={UserDetailsStackNavigator}
        name={ROUTE_USER_DETAILS_STACK_NAVIGATOR}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;

const styles = StyleSheet.create({});
