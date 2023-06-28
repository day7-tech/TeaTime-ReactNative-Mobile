import React, {useRef} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../Typography/Typography';

export default function GradientBtn({
  btnInfo,
  btnTextColor,
  onPress,
  shouldVibrate = false,
}) {
  const styles = StyleSheet.create({
    btnContainer: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 8,
    },
    btnText: {
      letterSpacing: 0.7,
      fontWeight: 'bold',
      fontSize: 18,
      color: btnTextColor,
      textAlign: 'center',
    },
  });

  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{scale: scaleValue}],
  };

  const onPressBtn = () => {
    if (shouldVibrate) Vibration.vibrate(50);
    return onPress();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPressBtn}>
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={['rgba(255, 61, 0, 0.88)', 'rgba(228, 41, 130, 0.85)']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.btnContainer}>
          <Typography style={styles.btnText}>{btnInfo}</Typography>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
