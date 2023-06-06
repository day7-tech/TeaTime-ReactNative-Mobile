import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatePostOptions from '../features/createPost/containers/CreatePostOptions';
import {
  ROUTE_CREATE_POST_OPTIONS,
  ROUTE_EDITING,
  ROUTE_GRADIENT_TEXT_POST,
  ROUTE_NOTES,
} from './RouteNames';
import Notes from '../features/createPost/containers/Notes';
import Back from '../components/Navigation/Back';
import BackIcon from '../../assets/images/arrow-left-rectangle.png';
import EditingScreen from '../features/createPost/containers/EditingScreen';
import GradientTextPost from '../features/createPost/containers/GradientTextPost';

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
