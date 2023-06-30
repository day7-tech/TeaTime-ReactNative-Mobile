import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Typography from '../../../components/Typography/Typography';
import {Colors} from '../../../utils/styles';
import BackIcon from '../../../../assets/images/back.png';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';

const FamilyMemberRelationRow = ({
  onPress,
  familyMemberImage,
  familyMemberName,
  accessType,
  relation,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View>
        <Image source={familyMemberImage} style={styles.familyImage} />
      </View>
      <View style={styles.detailsContainer}>
        <Typography style={[styles.familyMemberName]}>
          {familyMemberName}
        </Typography>
        <Typography style={[styles.accessType]}>{accessType}</Typography>
      </View>
      <View style={styles.relationContainer}>
        <Typography style={[styles.relation]}>{relation}</Typography>
      </View>
      <Image source={BackIcon} style={styles.rightImage} />
    </Pressable>
  );
};

export default FamilyMemberRelationRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  familyImage: {
    marginRight: 10,
  },
  familyMemberName: {
    color: Colors.black,
    marginBottom: 2,
    fontWeight: '600',
  },
  accessType: {
    color: Colors.textSecondary,
  },
  rightImage: {
    transform: [{rotate: '180deg'}], // Rotate the image 90 degrees clockwise
    marginLeft: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  relationContainer: {
    backgroundColor: Colors.darkGrey,
    paddingVertical: 8,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
});
