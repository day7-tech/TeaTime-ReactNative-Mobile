import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GroupsScreen from '../features/groups/containers/GroupsScreen';
import { ROUTE_ADD_NETWORK_MEMBERS, ROUTE_ADD_NETWORK_MEMBERS_CONTACTS, ROUTE_ADD_NETWORK_MEMBERS_EMAIL, ROUTE_GROUPS_SCREEN, ROUTE_NETWORK_USER_DETAIL } from './RouteNames';
import AddNetworkMembers from '../features/groups/containers/AddNetworkMembers';
import AddNetworkMembersContacts from '../features/groups/containers/AddNetworkMembersContacts';
import AddNetworkMembersEmail from '../features/groups/containers/AddNetworkMembersEmail';
import UserDetail from '../features/groups/containers/UserDetail';
const Stack = createNativeStackNavigator();

const GroupsNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            component={GroupsScreen}
            name={ROUTE_GROUPS_SCREEN}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            component={AddNetworkMembers}
            name={ROUTE_ADD_NETWORK_MEMBERS}
            options={{ headerTitle: "Add Network Members"}}
        />
         <Stack.Screen
            component={AddNetworkMembersContacts}
            name={ROUTE_ADD_NETWORK_MEMBERS_CONTACTS}
            options={{ headerTitle: "Add Network Members Contacts"}}
        />
         <Stack.Screen
            component={AddNetworkMembersEmail}
            name={ROUTE_ADD_NETWORK_MEMBERS_EMAIL}
            options={{ headerTitle: "Add Network Members Email"}}
        />
         <Stack.Screen
            component={UserDetail}
            name={ROUTE_NETWORK_USER_DETAIL}
            options={{ headerTitle: "User Detail"}}
        />
    </Stack.Navigator>
  )
}

export default GroupsNavigator;