import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import CreatePostOptions from '../features/createPost/containers/CreatePostOptions';
import EditingScreen from '../features/createPost/containers/EditingScreen';
import GradientTextPost from '../features/createPost/containers/GradientTextPost';
import {
  ROUTE_CREATE_POST_OPTIONS,
  ROUTE_EDITING,
  ROUTE_GRADIENT_TEXT_POST,
} from './RouteNames';

const Stack = createNativeStackNavigator();

const CreatePostStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={CreatePostOptions}
        name={ROUTE_CREATE_POST_OPTIONS}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        component={EditingScreen}
        name={ROUTE_EDITING}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        component={GradientTextPost}
        name={ROUTE_GRADIENT_TEXT_POST}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default CreatePostStackNavigator;

const styles = StyleSheet.create({});
