import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CommentsIcon from '../../../../assets/images/comments.png';
import LikeIcon from '../../../../assets/images/like.png';
import LikedIcon from '../../../../assets/images/liked.png';
import ReplyIcon from '../../../../assets/images/reply.png';
import ThanksIcon from '../../../../assets/images/thanks.png';
import FeedOption from '../../../components/FeedOption';

// FavouritesFeedOptions: Component for displaying feed options in the Favourites screen
const FavouritesFeedOptions = ({
  item,
  defaultLikes,
  isLiked,
  onThanksPress,
  onCommentsPress,
}) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount);

  // Handle the press event for the Like button
  const onLikePress = useCallback(() => {
    setLikeCount(prevCount => (like ? prevCount - 1 : prevCount + 1));
    setLike(prevLike => !prevLike);
  }, [like]);

  useEffect(() => {
    // Update the initial state based on the provided props
    setLike(isLiked ?? false);
    setLikeCount(defaultLikes ?? item.likeCount);
  }, [isLiked, defaultLikes, item.likeCount]);

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
        label={likeCount}
        imageIcon={like ? LikedIcon : LikeIcon}
        onPress={onLikePress}
      />
      {/* Comments Option */}
      <FeedOption
        label={'Comments'}
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
  container: {
    flex: 2,
  },
});
