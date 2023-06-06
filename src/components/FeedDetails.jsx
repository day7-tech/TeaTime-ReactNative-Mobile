import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../utils/styles";
import Typography from "./Typography/Typography";
import FeedCaption from "./FeedCaption";
import MomentsFeedOptions from "../features/home/components/MomentsFeedOptions";
import ChannelDetails from "./ChannelDetails";
import ChannelAndUploaderDetails from "./ChannelAndUploaderDetails";
import FavouritesFeedOptions from "../features/home/components/FavouritesFeedOptions";

/**
 * Component that displays the details of a feed item.
 * @param {StyleProp<ViewStyle>} style - Additional styles to apply to the container.
 * @param {object} item - The feed item data.
 * @param {Function} onUserDetailsPress - Function to handle the press event on the user details.
 * @param {number} defaultLikes - The default number of likes.
 * @param {boolean} isLiked - Indicates whether the item is liked.
 * @param {boolean} isFavourites - Indicates whether the item is in the favorites feed.
 * @param {Function} onThanksPress - Function to handle the press event on the thanks button.
 * @returns {JSX.Element} - The FeedDetails component.
 */
const FeedDetails = ({
  style,
  item,
  onUserDetailsPress,
  defaultLikes,
  isLiked,
  isFavourites,
  onThanksPress,
  onCommentsPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{ flex: 6 }}>
        {/* Render channel and uploader details based on whether it is in favorites */}
        {isFavourites ? (
          <ChannelAndUploaderDetails
            channelImage={item.channel.image}
            channelName={item.channel.name}
            uploaderImage={item.uploader.image}
            uploaderName={item.uploader.name}
            onPress={onUserDetailsPress}
          />
        ) : (
          <ChannelDetails
            channelImage={item.channel.image}
            channelName={item.channel.name}
            onPress={onUserDetailsPress}
          />
        )}
        <FeedCaption caption={item.description} />
      </View>
      {/* Render feed options based on whether it is in favorites */}
      {isFavourites ? (
        <FavouritesFeedOptions
          item={item}
          defaultLikes={defaultLikes}
          isLiked={isLiked}
          onThanksPress={onThanksPress}
          onCommentsPress={onCommentsPress}
        />
      ) : (
        <MomentsFeedOptions
          item={item}
          defaultLikes={defaultLikes}
          isLiked={isLiked}
          onThanksPress={onThanksPress}
          onCommentsPress={onCommentsPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default FeedDetails;
