import React from "react";
import { Text } from "react-native";
import styles from "./Typography.style";

/**
 * A component that displays text with some provided styling defaults.
 *
 * @param {TextProps} props The props to pass to the Text component.
 */
export default function Typography({ style, ...props }) {
  const fontFamily = (() => {
    switch (style?.fontWeight) {
      case "thin":
      case 100:
        return "Outfit-Thin";
      case "light":
      case 300:
      case 400:
        return "Outfit-Light";
      case "medium":
      case 500:
      case 600:
        return "Outfit-Medium";
      case 700:
      case 800:
      case 900:
      case "bold":
        return "Outfit-Bold";
      default:
        return "Outfit-Regular";
    }
  })();

  return <Text style={[styles.default, { fontFamily }, style]} {...props} />;
}
