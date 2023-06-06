import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "./Typography/Typography";
import { Colors } from "../utils/styles";
import { HORIZONTAL_MARGIN } from "../utils/constants";

const UserComment = ({ userImage, userName, comment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: userImage }} style={styles.commentUserImage} />
      </View>
      <View style={styles.commentContainer}>
        <Typography style={styles.userName}>{userName}</Typography>
        <Typography style={styles.comment}>{comment}</Typography>
      </View>
    </View>
  );
};

export default UserComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  userName: {
    color: Colors.black,
    fontWeight: 500,
    lineHeight: 20,
    fontSize: 15,
  },
  comment: {
    color: Colors.black,
    lineHeight: 16,
    fontSize: 13,
  },
  commentContainer: {
    backgroundColor: Colors.lightestGrey,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    flexShrink: 1,
  },
  imageContainer: {
    paddingRight: 7,
  },
});
