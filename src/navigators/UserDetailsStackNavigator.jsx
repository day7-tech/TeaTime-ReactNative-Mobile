import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Back from '../components/Navigation/Back';
import UserDetails from '../features/userDetails/containers/UserDetails';
import UserPostDetails from '../features/userDetails/containers/UserPostDetails';
import {ROUTE_USER_DETAILS, ROUTE_USER_POST_DETAILS} from './RouteNames';

const Stack = createNativeStackNavigator();

// UserDetailsStackNavigator: Handles the stack navigation for the User Details screen
const UserDetailsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={UserDetails}
        name={ROUTE_USER_DETAILS}
        options={({navigation}) => ({
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
          headerShadowVisible: false,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={UserPostDetails}
        name={ROUTE_USER_POST_DETAILS}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default UserDetailsStackNavigator;
