import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../utils/styles";

const AppTextInput = ({
  textStyle,
  containerStyle,
  multiline,
  suffixComponent,
  inputTextColor,
  placeholderTextColor,
  ...otherProps
}) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        multiline ? styles.containerMultilineOffset : {},
      ]}
    >
      <TextInput
        style={[
          styles.input,
          textStyle,
          multiline && styles.inputMultiline,
          { color: inputTextColor },
        ]}
        multiline
        placeholderTextColor={placeholderTextColor ?? Colors.darkGrey}
        selectionColor={Colors.primary}
        {...otherProps}
      />
      {suffixComponent && suffixComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  containerMultilineOffset: {
    paddingTop: 7,
  },
  input: {
    lineHeight: 20,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
});

export default AppTextInput;
