import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NetworkMemberItem from '../components/NetworkMemberItem/NetworkMemberItem';
import users from '../data/data'
import AddNetworkButton from '../components/AddNetworkButton/AddNetworkButton';
import colors from '../../../theme/color';
import fonts from '../../../theme/fonts';
const GroupsScreen = () => {
  return (
    <View style={styles.page}>
        <Text style={styles.title}>My Network</Text>
        <Text style={styles.body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan efficitur lacus non iaculis. Donec  </Text>
        <Text style={styles.heading}>Network Members</Text>
        <FlatList
            style={{ paddingVertical: 15 }}
            data={users}
            renderItem={({item}) => <NetworkMemberItem user={item} /> }
            ListFooterComponent={AddNetworkButton}
        />
    </View>
)
};

export default GroupsScreen;

const styles = StyleSheet.create({
  page: {
      paddingTop: 50,
      padding: 15,
      flex: 1,
      backgroundColor: colors.white
  },
  title: {
      textAlign: 'center',
      margin: 10,
      fontSize: 18,
      fontWeight: fonts.weight.bold,
  },
  heading: {
      paddingTop: 15,
      textAlign: 'left',
      fontSize: 18,
      fontWeight: fonts.weight.bold,
  },
  body: {
      fontSize: 18,
      marginVertical: 10,
  }
})