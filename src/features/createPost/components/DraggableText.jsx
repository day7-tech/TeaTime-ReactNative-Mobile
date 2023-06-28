import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Typography from '../../../components/Typography/Typography';

/**
 * DraggableText component that displays draggable text with gesture-based transformations.
 *
 * @param {Object} props - Component props.
 * @param {string} props.inputValue - The text value to display.
 * @param {string} props.textColor - The color of the text.
 * @param {number} props.fontSize - The font size of the text.
 * @param {function} props.onEditTextPress - Callback function when the text is pressed for editing.
 * @returns {JSX.Element} - DraggableText component.
 */
const DraggableText = ({inputValue, textColor, fontSize, onEditTextPress}) => {
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value.x},
      {translateY: offset.value.y},
      {scale: scale.value},
      {rotateZ: `${rotation.value}rad`},
    ],
  }));

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture),
  );

  const textStyle = {
    color: textColor,
    fontSize: fontSize,
    textAlign: 'center',
  };

  return (
    <Animated.View style={[styles.draggableTextContainer, animatedStyles]}>
      <GestureDetector gesture={composed}>
        <Pressable onPress={onEditTextPress}>
          <Typography style={[textStyle]}>{inputValue}</Typography>
        </Pressable>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  draggableTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggableText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default DraggableText;
