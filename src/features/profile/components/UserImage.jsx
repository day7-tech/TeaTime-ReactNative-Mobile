import React from 'react';
import {Image, StyleSheet} from 'react-native';

const UserImage = ({imageUri}) => {
  return <Image source={imageUri} style={styles.userImage} />;
};

export default UserImage;

const styles = StyleSheet.create({
  userImage: {
    width: 110,
    height: 110,
    borderRadius: 110,
  },
});
