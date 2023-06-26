import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackIcon from '../../../assets/images/back.png';

/**
 * Component that represents a back button.
 * @param {Function} onPress - The function to be called when the button is pressed.
 * @param {object} style - The additional styles to apply to the button.
 * @returns {JSX.Element} - The Back component.
 */
const Back = ({onPress, style, backArrowImage = BackIcon}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.hitArea, style]}>
      <Image source={backArrowImage} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default Back;

const styles = StyleSheet.create({
  hitArea: {
    height: '100%',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 15,
  },
});
