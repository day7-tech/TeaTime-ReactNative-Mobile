import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Colors} from '../utils/styles';

/**
 * Custom reusable TextInput component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.textStyle - Custom styles for the text input.
 * @param {Object} props.containerStyle - Custom styles for the container view.
 * @param {boolean} props.multiline - Indicates whether the input should support multiple lines.
 * @param {React.ReactNode} props.suffixComponent - Component to be displayed as a suffix.
 * @param {string} props.inputTextColor - Custom color for the input text.
 * @param {string} props.placeholderTextColor - Custom color for the placeholder text.
 * @param {Object} props.otherProps - Additional props to be passed to the TextInput component.
 * @returns {JSX.Element} - AppTextInput component.
 */
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
      ]}>
      {/* TextInput component */}
      <TextInput
        style={[
          styles.input,
          textStyle,
          multiline && styles.inputMultiline,
          {color: inputTextColor},
        ]}
        multiline={multiline}
        placeholderTextColor={placeholderTextColor ?? Colors.darkGrey}
        selectionColor={Colors.primary}
        {...otherProps}
      />

      {/* Display the suffixComponent if provided */}
      {suffixComponent && suffixComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  // Apply offset for multiline TextInput
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
