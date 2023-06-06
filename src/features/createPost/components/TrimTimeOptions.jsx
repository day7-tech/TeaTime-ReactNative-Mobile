import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import Typography from "../../../components/Typography/Typography";
import { Colors } from "../../../utils/styles";

const options = [
  { time: 100, label: "0.1s" },
  { time: 300, label: "0.3s" },
  { time: 500, label: "0.5s" },
  { time: 1000, label: "1.0s" },
  { time: 3000, label: "3.0s" },
];

const TrimTimeOptions = ({
  handleButtonPress,
  videoDuration,
  selectedInterval,
  handleDeselect,
}) => {
  const showButton = (time) => {
    return videoDuration >= time;
  };

  const handleIntervalSelection = (time) => {
    if (selectedInterval === time) {
      handleDeselect(); // Deselect the button if it is already selected
    } else {
      handleButtonPress(time); // Select the button
    }
  };

  return (
    <View style={styles.container}>
      {options.map(
        ({ time, label }) =>
          showButton(time) && (
            <Pressable
              key={time}
              onPress={() => handleIntervalSelection(time)}
              style={[
                styles.button,
                selectedInterval === time && {
                  borderColor: Colors.primary,
                  borderWidth: 2,
                },
              ]}
            >
              <Typography
                style={[
                  styles.buttonText,
                  selectedInterval === time && { color: Colors.primary },
                ]}
              >
                {label}
              </Typography>
            </Pressable>
          )
      )}
    </View>
  );
};

export default TrimTimeOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#4E4E4E",
    borderRadius: 4,
    marginHorizontal: 5,
    borderWidth: 2,
  },
  buttonText: {
    color: Colors.white,
  },
});
