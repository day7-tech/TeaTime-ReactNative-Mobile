import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Typography from '../../../components/Typography/Typography';
import {Colors} from '../../../utils/styles';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import Maria from '../../../../assets/images/Maria.png';
import FamilyMemberRelationRow from '../components/FamilyMemberRelationRow';
const FamilyMemberNetwork = ({navigation, route}) => {
  const {userDetails} = route.params;
  const familyGroupData = [
    {
      name: 'Maria Sutton',
      relation: 'Daugher',
      imageUri: Maria,
      accessType: 'Admin',
    },
    {
      name: 'John Doe',
      relation: 'Son',
      imageUri: Maria,
      accessType: 'Favourite Access',
    },
  ];

  const onFamilyMemberPress = useCallback(userDetails => {}, []);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <FamilyMemberRelationRow
          familyMemberImage={item.imageUri}
          familyMemberName={item.name}
          accessType={item.accessType}
          relation={item.relation}
          onPress={item => onFamilyMemberPress(item)}
        />
      );
    },
    [onFamilyMemberPress],
  );

  const onAddFamilyMembersPress = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <Typography style={styles.infoText}>
        Lorem ipsum dolor sit amet, nec nibh vit aeadipiscing elit. Lorem ipsum
        dolor sit amet.
      </Typography>
      <Typography style={styles.title}>Family Groups</Typography>
      <FlatList data={familyGroupData} renderItem={renderItem} />
      <Pressable
        style={styles.buttonContainer}
        onPress={onAddFamilyMembersPress}>
        <Typography style={styles.buttonText}>Add Family Members</Typography>
      </Pressable>
    </View>
  );
};

export default FamilyMemberNetwork;

const styles = StyleSheet.create({
  infoText: {
    color: Colors.black,
  },
  container: {
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  title: {
    color: Colors.black,
    fontSize: 17,
    fontWeight: '600',
    marginVertical: 15,
  },
  buttonContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
