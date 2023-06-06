import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FeedOption from "../../../components/FeedOption";
import LikeIcon from "../../../../assets/images/like.png";
import LikedIcon from "../../../../assets/images/liked.png";
import ShareIcon from "../../../../assets/images/share.png";

const MomentsFeedOptions = ({ item, defaultLikes, isLiked }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount);

  /**
   * Handle the Like button press.
   * Updates the like count and toggles the like state.
   */
  const onLikePress = useCallback(() => {
    setLikeCount((prevCount) => (like ? prevCount - 1 : prevCount + 1));
    setLike((prevLike) => !prevLike);
  }, [like]);

  useEffect(() => {
    setLike(isLiked ?? false);
    setLikeCount(defaultLikes ?? item.likeCount);
  }, [isLiked, defaultLikes]);

  /**
   * Handle the Share button press.
   */
  const onSharePress = useCallback(() => {
    // Add share functionality here
  }, []);

  return (
    <View style={styles.container}>
      {/* Like button */}
      <FeedOption
        label={likeCount}
        imageIcon={like ? LikedIcon : LikeIcon}
        onPress={onLikePress}
      />
      {/* Share button */}
      <FeedOption
        label={"Share"}
        imageIcon={ShareIcon}
        onPress={onSharePress}
      />
    </View>
  );
};

export default MomentsFeedOptions;

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
});
