import React, {FC} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../../utils/styles';
import ClockIcon from './../../../../assets/images/clock.png';

const HistoryRow = ({style, searchedText}) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={ClockIcon} style={styles.image} />
      <View style={styles.textContainer}>
        <Text>{searchedText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
});

export default HistoryRow;
