import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const UserImage = ({ imageUri }) => {
  return <Image source={{ uri: imageUri }} style={styles.userImage} />;
};

export default UserImage;

const styles = StyleSheet.create({
  userImage: {
    width: 110,
    height: 110,
    borderRadius: 110,
  },
});
