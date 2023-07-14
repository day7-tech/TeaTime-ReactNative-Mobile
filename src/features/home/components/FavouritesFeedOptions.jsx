import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CommentsIcon from '../../../../assets/images/comments.png';
import LikeIcon from '../../../../assets/images/like.png';
import LikedIcon from '../../../../assets/images/liked.png';
import ReplyIcon from '../../../../assets/images/reply.png';
import ThanksIcon from '../../../../assets/images/thanks.png';
import FeedOption from '../../../components/FeedOption';
import {likePost, unlikePost} from '../../../api/homeApi';
import {useDispatch} from 'react-redux';
import {updateLikeCount} from '../store/HomeActions';

// FavouritesFeedOptions: Component for displaying feed options in the Favourites screen
const FavouritesFeedOptions = ({
  postId,
  numberOfLikes,
  isLiked,
  onThanksPress,
  onCommentsPress,
  numerOfComments,
}) => {
  const dispatch = useDispatch();

  // Handle the press event for the Like button
  const onLikePress = useCallback(() => {
    isLiked ? handleUnlikePost() : handleLikePost();
  }, [handleLikePost, handleUnlikePost, isLiked]);

  const handleLikePost = useCallback(async () => {
    try {
      const res = await likePost(postId);
      dispatch(updateLikeCount(res.postId, res.hasLikedPost));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, postId]);

  // Handle the unlike button press
  const handleUnlikePost = useCallback(async () => {
    try {
      const res = await unlikePost(postId);
      dispatch(updateLikeCount(res.postId, res.hasLikedPost));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, postId]);

  const onSharePress = useCallback(() => {
    // Handle the press event for the Share button
  }, []);

  return (
    <View style={styles.container}>
      {/* Thanks Option */}
      <FeedOption
        label={'Thanks'}
        imageIcon={ThanksIcon}
        onPress={onThanksPress}
      />
      {/* Like Option */}
      <FeedOption
        label={numberOfLikes}
        imageIcon={isLiked ? LikedIcon : LikeIcon}
        onPress={onLikePress}
      />
      {/* Comments Option */}
      <FeedOption
        label={numerOfComments}
        imageIcon={CommentsIcon}
        onPress={onCommentsPress}
      />
      {/* Reply Option */}
      <FeedOption
        label={'Reply'}
        imageIcon={ReplyIcon}
        onPress={onSharePress}
      />
    </View>
  );
};

export default FavouritesFeedOptions;

const styles = StyleSheet.create({
  container: {},
});
