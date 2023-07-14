import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../utils/styles';
import Typography from './Typography/Typography';

const UserComment = ({userImage, userName, comment, isUser}) => {
  return (
    <View style={styles.container}>
      {isUser ? (
        <>
          <View style={styles.commentContainer}>
            <Typography style={styles.userName}>{userName}</Typography>
            <Typography style={styles.comment}>{comment}</Typography>
          </View>
          <View style={styles.imageContainer}>
            <Image source={userImage} style={styles.commentUserImage} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image source={userImage} style={styles.commentUserImage} />
          </View>
          <View style={styles.commentContainer}>
            <Typography style={styles.userName}>{userName}</Typography>
            <Typography style={styles.comment}>{comment}</Typography>
          </View>
        </>
      )}
    </View>
  );
};

export default UserComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
