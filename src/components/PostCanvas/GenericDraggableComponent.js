import React, { useState } from 'react';
import { View, PanResponder, Image } from 'react-native';
import styles from "./ComponentStyling";

const GenericDraggableComponent = ({size, setSize, children}) => {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [currentFingerAngle, setCurrentFingerAngle] = useState(-1);
  const [fingerSpan, setFingerSpan] = useState(-1);
  const [onTouchSize, setOnTouchStartSize] = useState(-1);

  const panResponder =
    PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            if (gestureState.numberActiveTouches === 1) {
                setPan({
                    x: pan.x + gestureState.dx,
                    y: pan.y + gestureState.dy,
                });
            } else if (gestureState.numberActiveTouches === 2) {
                const dx = evt.nativeEvent.touches[1].pageX - evt.nativeEvent.touches[0].pageX;
                const dy = evt.nativeEvent.touches[1].pageY - evt.nativeEvent.touches[0].pageY;
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const angleDiff = (currentFingerAngle - angle)
                if(fingerSpan < 0){
                  setFingerSpan(Math.sqrt(dx*dx + dy*dy));
                }
                else{
                  if(onTouchSize > 0)
                    setSize(onTouchSize * Math.sqrt(dx*dx + dy*dy) / fingerSpan);
                }
                if(Math.abs(angleDiff) < 2){
                  setRotation(rotation - angleDiff);
                }
                setCurrentFingerAngle(angle);
            }
        },
    })
  
  const onTouchStart = ()=>{
    setOnTouchStartSize(size);
  }

  const onTouchEnd = ()=>{
    setOnTouchStartSize(-1);
    setFingerSpan(-1);
  }

  return (
    <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={[styles.draggable, { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: `${rotation}deg` }] }]}  {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

export default GenericDraggableComponent;