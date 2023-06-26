import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import styles from './ComponentStyling';
import GenericDraggableComponent from './GenericDraggableComponent';

export default function DraggableTextComponent() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('Drag me!');
  const [size, setSize] = useState(20);

  const handlePress = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleChangeText = newText => {
    setText(newText);
  };

  return (
    <GenericDraggableComponent setSize={setSize} size={size}>
      {editing ? (
        <TextInput
          style={[styles.input, {fontSize: size}]}
          value={text}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <Text style={[styles.input, {fontSize: size}]} onPress={handlePress}>
          {text}
        </Text>
      )}
    </GenericDraggableComponent>
  );
}
