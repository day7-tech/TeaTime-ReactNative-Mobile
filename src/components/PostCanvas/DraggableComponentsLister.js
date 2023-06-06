import React from 'react';
import { View } from 'react-native';
import styles from "./ComponentStyling";
import DraggableImage from './DraggableImageComponent';
import DraggableText from './DraggableTextComponent';

function getRandomThumbnail() {
  return `https://d37hcy55dsnar2.cloudfront.net/new-videos/thumbnail_${
    1 + Math.floor(Math.random() * 28)
  }.png`;
}

export default function DraggableTextContainer(){
  return <View style={styles.container}>
    <DraggableText />
    <DraggableImage uri={getRandomThumbnail()}/>
  </View>
}

