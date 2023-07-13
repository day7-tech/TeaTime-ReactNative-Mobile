import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NetworkMemberItem from '../components/NetworkMemberItem/NetworkMemberItem';
import users from '../data/data'
import AddNetworkButton from '../components/AddNetworkButton/AddNetworkButton';
import RightArrow from '../../../../assets/images/right-arrow.png';

import colors from '../../../theme/color';
import fonts from '../../../theme/fonts';
import { useNavigation, useRoute } from '@react-navigation/native';
const GroupsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.page}>
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 0, zIndex: 100}}>
            <Image source={RightArrow} style={{ transform: [{ rotate: '180deg'}], marginTop: 15, marginLeft: 10,  width: 15, height: 15, resizeMode: 'contain', position: 'absolute' }} />
        </Pressable>
        <Text style={styles.title}>{route.params.groupName}</Text>
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
      fontSize: 17,
      marginVertical: 10,
  }
})