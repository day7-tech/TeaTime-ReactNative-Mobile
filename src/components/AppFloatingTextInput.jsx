import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {Colors} from '../utils/styles';
import Typography from './Typography/Typography';

const AppFloatingTextInput = ({
  inputTextContainer,
  onChangeText,
  value,
  placeholder,
  error,
  errorText,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={[inputTextContainer]}>
      <FloatingLabelInput
        label={placeholder}
        value={value}
        onChangeText={onChangeText}
        isFocused={isFocused}
        onFocus={handleFocus}
        onBlur={handleBlur}
        containerStyles={[
          styles.inputContainer,
          isFocused ? styles.focusedContainer : styles.blurredContainer,
        ]}
        customLabelStyles={styles.customLabelStyles}
        labelStyles={isFocused ? styles.focusedLabelStyle : styles.blurredLabel}
        inputStyles={styles.inputStyle}
        {...rest}
      />
      {error && (
        <Typography style={styles.errorText}>
          {errorText ?? 'Invalid Input'}
        </Typography>
      )}
    </View>
  );
};

export default AppFloatingTextInput;

const styles = StyleSheet.create({
  inputStyle: {
    color: Colors.black,
    paddingHorizontal: 10,
    lineHeight: 20,
    fontSize: 16,
    paddingTop: 10,
    flex: 1,
  },
  focusedLabelStyle: {
    backgroundColor: Colors.primariesShade03,
    fontSize: 16,
  },
  blurredLabel: {
    fontSize: 16,
  },
  customLabelStyles: {
    fontSizeFocused: 12,
    fontSizeBlurred: 16,
    leftBlurred: 10,
    leftFocused: 10,
    colorFocused: Colors.primary,
    colorBlurred: Colors.darkGrey,
  },
  inputContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 56,
  },
  focusedContainer: {
    backgroundColor: Colors.primariesShade03,
    borderColor: Colors.primary,
  },
  blurredContainer: {
    backgroundColor: Colors.grey,
    borderColor: Colors.lightestGrey,
  },
  errorText: {
    color: Colors.red,
    fontSize: 14,
    marginTop: 4,
  },
  errorContainer: {
    borderColor: Colors.red,
  },
});
