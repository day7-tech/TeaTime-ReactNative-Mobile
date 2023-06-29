import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/styles';
import Typography from '../../../components/Typography/Typography';
import BackIcon from '../../../../assets/images/back.png';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';

const SettingOptions = ({
  optionName,
  optionDetails,
  optionIcon,
  onPress,
  optionNameStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {optionIcon && <Image source={optionIcon} style={styles.image} />}
      <View style={styles.optionDetailsContainer}>
        <Typography style={[styles.optionName, optionNameStyle]}>
          {optionName}
        </Typography>
        {optionDetails && (
          <Typography style={styles.optionDetails}>{optionDetails}</Typography>
        )}
      </View>
      <Image source={BackIcon} style={styles.rightImage} />
    </Pressable>
  );
};

export default SettingOptions;

const styles = StyleSheet.create({
  image: {
    tintColor: Colors.black,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rightImage: {
    transform: [{rotate: '180deg'}], // Rotate the image 90 degrees clockwise
    marginRight: HORIZONTAL_MARGIN,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionName: {
    color: Colors.black,
    fontSize: 17,
    marginBottom: 2,
  },
  optionDetails: {
    color: Colors.darkGrey,
    fontSize: 13,
  },
  optionDetailsContainer: {
    flex: 1,
  },
});
