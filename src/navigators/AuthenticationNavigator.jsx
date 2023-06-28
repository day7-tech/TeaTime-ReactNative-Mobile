import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ROUTE_CREATE_PASSWORD_SCREEN,
  ROUTE_USER_BIRTHDATE_SCREEN,
  ROUTE_USER_NAME_SCREEN,
  ROUTE_USER_PROFILE_IMAGE_SCREEN,
  ROUTE_VERIFICATION_CODE_SCREEN,
  ROUTE_VERIFY_EMAIL_SCREEN,
  ROUTE_WELCOME_SCREEN,
} from './RouteNames';
import WelcomeScreen from '../features/auth/containers/WelcomeScreen';
import VerifyEmailScreen from '../features/auth/containers/VerifyEmailScreen';
import CreatePasswordScreen from '../features/auth/containers/CreatePasswordScreen';
import Back from '../components/Navigation/Back';
import BackArrowIcon from '../../assets/images/arrow-left.png';
import {StyleSheet} from 'react-native';
import VerificationCodeScreen from '../features/auth/containers/VerificationCodeScreen';
import UserNameScreen from '../features/onboarding/containers/UserNameScreen';
import UserBirthDateScreen from '../features/onboarding/containers/UserBirthDateScreen';
import UserProfileImageScreen from '../features/onboarding/containers/UserProfileImageScreen';
const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE_WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        name={ROUTE_VERIFY_EMAIL_SCREEN}
        component={VerifyEmailScreen}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        name={ROUTE_CREATE_PASSWORD_SCREEN}
        component={CreatePasswordScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={ROUTE_VERIFICATION_CODE_SCREEN}
        component={VerificationCodeScreen}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        name={ROUTE_USER_NAME_SCREEN}
        component={UserNameScreen}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        name={ROUTE_USER_BIRTHDATE_SCREEN}
        component={UserBirthDateScreen}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        name={ROUTE_USER_PROFILE_IMAGE_SCREEN}
        component={UserProfileImageScreen}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    marginHorizontal: 0,
  },
});
export default AuthenticationNavigator;
