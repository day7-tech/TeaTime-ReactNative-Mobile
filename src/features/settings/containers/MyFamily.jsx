import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Maria from '../../../../assets/images/Maria.png';
import FamilyMemberRow from '../components/FamilyMemberRow';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {ROUTE_FAMILY_MEMBERS_NETWORK} from '../../../navigators/RouteNames';

const MyFamily = ({navigation}) => {
  const familydata = [
    {
      name: 'Maria Sutton',
      createdBy: 'Created by blossom age care',
      imageUri: Maria,
    },
    {
      name: 'John Doe',
      createdBy: 'Created by XYZ Home Services',
      imageUri: Maria,
    },
    {
      name: 'Emily Johnson',
      createdBy: 'Created by Elderly Care Solutions',
      imageUri: Maria,
    },
    {
      name: 'Michael Brown',
      createdBy: 'Created by Senior Living Assistance',
      imageUri: Maria,
    },
    {
      name: 'Sarah Williams',
      createdBy: 'Created by Loving Hands Care',
      imageUri: Maria,
    },
    {
      name: 'David Smith',
      createdBy: 'Created by Forever Young Senior Care',
      imageUri: Maria,
    },
    {
      name: 'Jennifer Davis',
      createdBy: 'Created by Golden Years Home Care',
      imageUri: Maria,
    },
    {
      name: 'Robert Thompson',
      createdBy: 'Created by Angelic Care Services',
      imageUri: Maria,
    },
  ];

  const onFamilyMemberPress = useCallback(
    userDetails => {
      navigation.navigate(ROUTE_FAMILY_MEMBERS_NETWORK, {userDetails});
    },
    [navigation],
  );
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <FamilyMemberRow
          familyMemberImage={item.imageUri}
          familyMemberName={item.name}
          createdBy={item.createdBy}
          onPress={item => onFamilyMemberPress(item)}
        />
      );
    },
    [onFamilyMemberPress],
  );
  return (
    <View style={styles.container}>
      <FlatList data={familydata} renderItem={renderItem} />
    </View>
  );
};

export default MyFamily;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HORIZONTAL_MARGIN,
  },
});
