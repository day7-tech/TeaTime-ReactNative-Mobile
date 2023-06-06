import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '../../../../assets/images/back.png';
import CustomSlider from '../../../components/CustomSlider';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';

const GradientTextPost = ({}) => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState(Colors.white);
  const [selectedSize, setSelectedSize] = useState(20);
  const [textValue, setTextValue] = useState('');
  const sliderAnimation = useRef(new Animated.Value(0)).current;
  const [gradientColors, setGradientColors] = useState([
    '#FF3D00',
    '#E42982',
    '#5A189A',
  ]);
  const sliderInteractionTimer = useRef(null);
  const [isSliderInteracting, setIsSliderInteracting] = useState(false);

  const handleTextChange = text => {
    setTextValue(text);
  };

  const handleColorPress = color => {
    setSelectedColor(color);
  };

  const handleSizeChange = value => {
    setSelectedSize(value);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSliderInteraction = useCallback(
    isInteracting => {
      setIsSliderInteracting(isInteracting);
      Animated.timing(sliderAnimation, {
        toValue: isInteracting ? 0 : -25,
        duration: 100,
        useNativeDriver: false,
      }).start();

      // Reset the slider interaction timer
      clearTimeout(sliderInteractionTimer.current);
      sliderInteractionTimer.current = setTimeout(() => {
        handleSliderInteraction(false);
      }, 8000);
    },
    [sliderAnimation],
  );

  useEffect(() => {
    // Set the slider interaction to false after 15 seconds of inactivity
    sliderInteractionTimer.current = setTimeout(() => {
      handleSliderInteraction(false);
    }, 8000);

    return () => {
      // Clear the timer on component unmount or re-render
      clearTimeout(sliderInteractionTimer.current);
    };
  }, [handleSliderInteraction, isSliderInteracting]);

  const onCloseModalPress = () => {
    navigation.goBack();
  };

  const onDonePress = () => {
    navigation.goBack();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Set pan responder only if swiping from right to left
        return (
          gestureState.dx < -50 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        );
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100) {
          // Generate new gradient colors
          const colors = generateRandomGradientColors();

          // Set the new gradient colors as the background
          setGradientColors(colors);
        }
      },
    }),
  ).current;

  const generateRandomGradientColors = () => {
    // Define your possible gradient colors
    const colors = [
      ['#FF3D00', '#E42982', '#5A189A'],
      ['#FF0000', '#00FF00', '#0000FF'],
      ['#FFC300', '#6A0572', '#007991'],
      // Add more predefined gradient colors here
    ];

    // Generate a random index to select a gradient from the colors array
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the randomly selected gradient colors
    return colors[randomIndex];
  };

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
      {...panResponder.panHandlers}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={onCloseModalPress}>
              <Image source={BackIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} onPress={onDonePress}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            style={styles.editorContainer}
            behavior="padding">
            <View style={styles.textContainer}>
              <View style={styles.sliderContainer}>
                <Animated.View style={{left: sliderAnimation}}>
                  <CustomSlider
                    value={selectedSize}
                    onValueChange={handleSizeChange}
                    onInteraction={handleSliderInteraction}
                  />
                </Animated.View>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    {color: selectedColor},
                    {fontSize: selectedSize},
                  ]}
                  placeholder="Add text..."
                  placeholderTextColor={selectedColor || Colors.white}
                  multiline={true}
                  numberOfLines={4}
                  value={textValue}
                  onChangeText={handleTextChange}
                />
              </View>
            </View>
            <View style={styles.sidebar}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, {backgroundColor: Colors.white}]}
                onPress={() => handleColorPress(Colors.white)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, {backgroundColor: Colors.black}]}
                onPress={() => handleColorPress(Colors.black)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, {backgroundColor: Colors.green}]}
                onPress={() => handleColorPress(Colors.green)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, {backgroundColor: Colors.yellow}]}
                onPress={() => handleColorPress(Colors.yellow)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, {backgroundColor: Colors.darkPink}]}
                onPress={() => handleColorPress(Colors.darkPink)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, {backgroundColor: Colors.red}]}
                onPress={() => handleColorPress(Colors.red)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, {backgroundColor: Colors.skyBlue}]}
                onPress={() => handleColorPress(Colors.skyBlue)}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default GradientTextPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingBottom: 50,
    paddingTop: HORIZONTAL_MARGIN,
    paddingHorizontal: HORIZONTAL_MARGIN,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editorContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sliderContainer: {
    zIndex: 10,
    position: 'absolute',
    left: -120,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  textInput: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '600',
  },
  sidebar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backIcon: {
    tintColor: Colors.white,
  },
});
