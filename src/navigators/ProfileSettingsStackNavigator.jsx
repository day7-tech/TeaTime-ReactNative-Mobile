import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../features/settings/containers/Settings';
import {
  ROUTE_ACCOUNT_SETTINGS,
  ROUTE_EDIT_PROFILE,
  ROUTE_FAMILY_MEMBERS_NETWORK,
  ROUTE_MY_FAMILY,
  ROUTE_SETTINGS,
} from './RouteNames';
import Back from '../components/Navigation/Back';
import EditProfile from '../features/settings/containers/EditProfile';
import AccountSettings from '../features/settings/containers/AccountSettings';
import MyFamily from '../features/settings/containers/MyFamily';
import FamilyMemberNetwork from '../features/settings/containers/FamilyMemberNetwork';

const Stack = createNativeStackNavigator();
const ProfileSettingsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Settings}
        name={ROUTE_SETTINGS}
        options={({navigation}) => ({
          title: 'Settings',
          headerLeft: () => (
            <Back onPress={() => navigation.goBack()} iconStyle={styles.back} />
          ),
          headerShadowVisible: false,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={EditProfile}
        name={ROUTE_EDIT_PROFILE}
        options={({navigation}) => ({
          title: 'Edit Profile',
          headerLeft: () => (
            <Back onPress={() => navigation.goBack()} iconStyle={styles.back} />
          ),
          headerShadowVisible: false,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={AccountSettings}
        name={ROUTE_ACCOUNT_SETTINGS}
        options={({navigation}) => ({
          title: 'Account Settings',
          headerLeft: () => (
            <Back onPress={() => navigation.goBack()} iconStyle={styles.back} />
          ),
          headerShadowVisible: false,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={MyFamily}
        name={ROUTE_MY_FAMILY}
        options={({navigation}) => ({
          title: 'My Family',
          headerLeft: () => (
            <Back onPress={() => navigation.goBack()} iconStyle={styles.back} />
          ),
          headerShadowVisible: false,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={FamilyMemberNetwork}
        name={ROUTE_FAMILY_MEMBERS_NETWORK}
        options={({navigation}) => ({
          title: 'My Family',
          headerLeft: () => (
            <Back onPress={() => navigation.goBack()} iconStyle={styles.back} />
          ),
          headerShadowVisible: false,
          gestureEnabled: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileSettingsStackNavigator;

const styles = StyleSheet.create({
  back: {
    marginHorizontal: 0,
  },
});
