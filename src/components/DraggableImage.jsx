import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

/**
 * DraggableImage component that allows the user to drag, zoom, and rotate an image.
 *
 * @param {Object} props - Component props.
 * @param {ImageSourcePropType} props.image - The image source.
 * @param {function} props.onImagePress - Callback function when the image is pressed.
 * @returns {JSX.Element} - DraggableImage component.
 */
const DraggableImage = ({image, onImagePress}) => {
  // Shared values for animated transformations
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  // Define animated styles based on shared values
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value.x},
      {translateY: offset.value.y},
      {scale: scale.value},
      {rotateZ: `${rotation.value}rad`},
    ],
  }));

  // Gesture handlers for drag, zoom, and rotate
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

  // Combine gestures for simultaneous detection
  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture),
  );

  return (
    <Animated.View style={[styles.draggableImageContainer, animatedStyles]}>
      <GestureDetector gesture={composed}>
        <Pressable onPress={onImagePress}>
          <Image source={image} style={styles.image} />
        </Pressable>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  draggableImageContainer: {
    position: 'absolute',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default DraggableImage;
