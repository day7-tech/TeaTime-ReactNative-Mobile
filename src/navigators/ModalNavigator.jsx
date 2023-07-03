import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Colors} from '../utils/styles';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import RNBootSplash from 'react-native-bootsplash';
import {
  ROUTE_AUTHENTICATED_NAVIGATOR,
  ROUTE_AUTHENTICATION_NAVIGATOR,
} from './RouteNames';
import AuthenticationNavigator from './AuthenticationNavigator';

// Create a native stack navigator
const ModalStack = createNativeStackNavigator();

// ModalNavigator component
// Renders a navigation container with a transparent theme and a single screen component
// Parameters:
// - style: optional style for the container
// Returns: a modal navigator component
const ModalNavigator = () => {
  // Define a transparent theme for the navigation container
  const TransparentTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.white, // Set the background color to white
    },
  };

  return (
    <NavigationContainer
      theme={TransparentTheme}
      onReady={() => RNBootSplash.hide()}>
      <ModalStack.Navigator>
        <ModalStack.Screen
          name={ROUTE_AUTHENTICATION_NAVIGATOR}
          component={AuthenticationNavigator}
          options={{
            headerShown: false, // Hide the header for the screen
          }}
        />
        <ModalStack.Screen
          name={ROUTE_AUTHENTICATED_NAVIGATOR}
          component={AuthenticatedNavigator}
          options={{
            headerShown: false, // Hide the header for the screen
          }}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};

export default ModalNavigator;
