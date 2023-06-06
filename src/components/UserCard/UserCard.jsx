import React from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./UserCard.style";
import Typography from "../Typography/Typography";

/**
 * A card that displays a user's profile picture and name.
 *
 * @param {string} props.name The user's name.
 * @param {string} props.image A uri to the user's profile picture.
 */
export default function UserCard({ name, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image }} />
        <Typography style={styles.name}>{name}</Typography>
      </View>
    </TouchableWithoutFeedback>
  );
}
