import React, { useRef } from 'react';
import { View, PanResponder, Animated } from 'react-native';

const FontResizeSlider = ({ minFontSize, maxFontSize, onFontSizeChange }) => {
    const position = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dy: position
                    }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                const newPosition = position.__getValue();
                const newFontSize = minFontSize + ((maxFontSize - minFontSize) * newPosition) / 200;
                onFontSizeChange(newFontSize);
            }
        })
    ).current;

    return (
        <View
            style={{
                width: 40,
                height: 200,
                backgroundColor: '#f0f0f0',
                justifyContent: 'flex-end',
                borderTopWidth: 10,
                borderBottomWidth: 10,
                borderTopColor: 'black',
                borderBottomColor: 'black'
            }}
        >
            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: 'black',
                    alignSelf: 'center',
                    transform: [
                        {
                            translateY: position.interpolate({
                                inputRange: [0, 200],
                                outputRange: [0, -200],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}
            ></Animated.View>
        </View>
    );
};

export default FontResizeSlider;
