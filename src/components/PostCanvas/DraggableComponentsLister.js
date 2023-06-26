import React from 'react';
import {View} from 'react-native';
import styles from './ComponentStyling';
import DraggableImage from './DraggableImageComponent';
import DraggableText from './DraggableTextComponent';

/**
 * Function to generate a random thumbnail URI.
 * @returns {string} Random thumbnail URI.
 */
function getRandomThumbnail() {
  return `https://d37hcy55dsnar2.cloudfront.net/new-videos/thumbnail_${
    1 + Math.floor(Math.random() * 28)
  }.png`;
}

/**
 * Component for rendering a container with draggable text and image components.
 */
export default function DraggableTextContainer() {
  return (
    <View style={styles.container}>
      {/* Draggable text component */}
      <DraggableText />

      {/* Draggable image component */}
      <DraggableImage uri={getRandomThumbnail()} />
    </View>
  );
}
