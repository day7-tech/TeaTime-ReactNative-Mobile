import React, { useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Vibration, View, Animated } from 'react-native';
import Typography from '../Typography/Typography';

export default function NormalBtn({ btnInfo, btnBgColor, btnTextColor, onPress }) {
    const styles = StyleSheet.create({
        btnContainer: {
            backgroundColor: btnBgColor,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 8
        },
        btnText: {
            letterSpacing: 0.7,
            fontWeight: 'bold',
            fontSize: 18,
            color: btnTextColor,
            textAlign: 'center'
        }
    });

    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scaleValue, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true
        }).start();
    };

    const onPressBtn = () => {
        Vibration.vibrate(50);
        onPress();
    };

    const handlePressOut = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start(() => onPressBtn());
    };

    const animatedStyle = {
        transform: [{ scale: scaleValue }]
    };

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={animatedStyle}>
                <View style={styles.btnContainer}>
                    <Typography style={styles.btnText}>{btnInfo}</Typography>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}
