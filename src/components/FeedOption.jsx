import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../utils/styles";
import Typography from "./Typography/Typography";

/**
 * Component representing a feed option.
 * @param {StyleProp<ViewStyle>} style - Additional styles to apply to the container.
 * @param {ImageSourcePropType} imageIcon - The image icon for the feed option.
 * @param {string} label - The label text for the feed option.
 * @param {Function} onPress - Function to handle the press event.
 * @returns {JSX.Element} - The FeedOption component.
 */
const FeedOption = ({ style, imageIcon, label, onPress, textStyle }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Image source={imageIcon} />
      <Typography
        style={[styles.label, textStyle]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    color: Colors.white,
    marginVertical: 8,
    textAlign: "center",
  },
});

export default FeedOption;
