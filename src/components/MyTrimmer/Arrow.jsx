import React from "react";
import { StyleSheet, View } from "react-native";

const BaseArrow = ({ rotationStyle }) => {
  return (
    <View style={[styles.root, rotationStyle]}>
      <View style={[styles.dot]} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  rootRight: {
    transform: [{ rotate: "180deg" }],
  },
  dot: {
    position: "absolute",
    height: 12,
    width: 12,
    backgroundColor: "white",
    borderRadius: 6,
  },
});

export const Left = (props) => (
  <BaseArrow {...props} rotationStyle={styles.rootLeft} />
);

export const Right = (props) => (
  <BaseArrow {...props} rotationStyle={styles.rootRight} />
);
