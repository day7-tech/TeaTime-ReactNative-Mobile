import React, { useState } from 'react';
import { Image } from 'react-native';
import GenericDraggableComponent from './GenericDraggableComponent';

const DraggableImage = ({uri}) => {

  const [size, setSize] = useState(100);
  
  return (
    <GenericDraggableComponent size={size} setSize={setSize}>
      <Image style={{ width: size, height: size }} resizeMode='stretch' source={{uri: uri}}/>
    </GenericDraggableComponent>
  );
};

export default DraggableImage;