import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Typography from '../../../components/Typography/Typography';
import {Colors} from '../../../utils/styles';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';

const FamilyMemberRow = ({
  onPress,
  familyMemberImage,
  familyMemberName,
  createdBy,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View>
        <Image source={familyMemberImage} style={styles.familyImage} />
        <View style={styles.onlineStatus} />
      </View>
      <View>
        <Typography style={[styles.familyMemberName]}>
          {familyMemberName}
        </Typography>
        <Typography style={[styles.createdBy]}>{createdBy}</Typography>
      </View>
    </Pressable>
  );
};

export default FamilyMemberRow;

const styles = StyleSheet.create({
  familyMemberName: {
    color: Colors.black,
    marginBottom: 2,
    fontWeight: '600',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  createdBy: {
    color: Colors.textSecondary,
  },
  familyImage: {
    marginRight: 10,
  },
  onlineStatus: {
    height: 15,
    width: 15,
    borderRadius: 8,
    backgroundColor: Colors.success,
    position: 'absolute',
    bottom: 1,
    right: 10,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});
