import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import TabBarOption from '../components/TabBarOption';
import Typography from '../components/Typography/Typography';
import HomeScreen from '../features/home/containers/HomeScreen';
import {Colors} from '../utils/styles';
import BellIcon from './../../assets/images/bell.png';
import AddIcon from './../../assets/images/floating_add.png';
import HomeIcon from './../../assets/images/home.png';
import ProfileIcon from './../../assets/images/user.png';
import GroupsIcon from './../../assets/images/users.png';
import CreatePostStackNavigator from './CreatePostStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import {
  ROUTE_CREATE_POST_STACK_NAVIGATOR,
  ROUTE_GROUPS_SCREEN,
  ROUTE_HOME_SCREEN,
  ROUTE_NOTIFICATIONS_SCREEN,
  ROUTE_PROFILE_NAVIGATOR,
} from './RouteNames';
import NotificationScreens from '../features/notifications/containers/NotificationScreen';
import GroupsScreen from '../features/groups/containers/GroupsScreen';

const Tab = createBottomTabNavigator();

// TabNavigator: Manages the bottom tab navigation in the app
const TabNavigator = props => {
  const hide = props.routeName != ROUTE_CREATE_POST_STACK_NAVIGATOR;
  return (
    <Tab.Navigator
      initialRouteName={ROUTE_HOME_SCREEN}
      screenOptions={() => ({
        tabBarItemStyle: {
          width: '100%',
        },
        tabBarStyle: {
          backgroundColor: Colors.black,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 3,
          paddingTop: 10,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.white,
      })}>
      {/* Home Tab */}
      <Tab.Screen
        component={HomeScreen}
        name={ROUTE_HOME_SCREEN}
        options={{
          headerShown: false,
          tabBarLabel: ({color}) => (
            <Typography style={{color: color, fontSize: 10}}>Home</Typography>
          ),
          tabBarIcon: ({color}) => (
            <TabBarOption imageIcon={HomeIcon} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />

      {/* Groups Tab */}
      <Tab.Screen
        component={GroupsScreen}
        name={ROUTE_GROUPS_SCREEN}
        options={{
          tabBarLabel: ({color}) => (
            <Typography style={{color: color, fontSize: 10}}>Groups</Typography>
          ),
          tabBarIcon: ({color}) => (
            <TabBarOption imageIcon={GroupsIcon} color={color} />
          ),
        }}
      />

      {/* Add Content Tab */}
      <Tab.Screen
        component={CreatePostStackNavigator}
        name={ROUTE_CREATE_POST_STACK_NAVIGATOR}
        options={{
          headerShown: false,
          tabBarStyle: {display: hide ? 'none' : 'flex'},
          tabBarLabel: () => null,
          tabBarIcon: () => <TabBarOption imageIcon={AddIcon} />,
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        component={NotificationScreens}
        name={ROUTE_NOTIFICATIONS_SCREEN}
        options={{
          tabBarLabel: ({color}) => (
            <Typography style={{color: color, fontSize: 10}}>
              Notifications
            </Typography>
          ),
          tabBarIcon: ({color}) => (
            <TabBarOption imageIcon={BellIcon} color={color} />
          ),
        }}
      />

      {/* Notifications Tab */}
      <Tab.Screen
        component={ProfileStackNavigator}
        name={ROUTE_PROFILE_NAVIGATOR}
        options={{
          headerShown: false,
          tabBarLabel: ({color}) => (
            <Typography style={{color: color, fontSize: 10}}>
              Profile
            </Typography>
          ),
          tabBarIcon: ({color}) => (
            <TabBarOption imageIcon={ProfileIcon} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
