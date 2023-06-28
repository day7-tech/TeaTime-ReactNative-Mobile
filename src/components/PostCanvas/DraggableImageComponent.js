import React, {useState} from 'react';
import {Image} from 'react-native';
import GenericDraggableComponent from './GenericDraggableComponent';

/**
 * DraggableImage component displays an image that can be dragged.
 * @param {string} uri - The URI of the image.
 */
const DraggableImage = ({uri}) => {
  const [size, setSize] = useState(100);

  return (
    <GenericDraggableComponent size={size} setSize={setSize}>
      {/* Image component that can be dragged */}
      <Image
        style={{width: size, height: size}}
        resizeMode="stretch"
        source={{uri: uri}}
      />
    </GenericDraggableComponent>
  );
};

export default DraggableImage;
