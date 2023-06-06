import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../../../../assets/images/back.png";
import CustomSlider from "../../../components/CustomSlider";
import { HORIZONTAL_MARGIN } from "../../../utils/constants";
import { Colors } from "../../../utils/styles";

const EditPostTextModal = ({
  isModalVisible,
  onCloseModalPress,
  onDonePress,
}) => {
  const [selectedColor, setSelectedColor] = useState(Colors.white);
  const [selectedSize, setSelectedSize] = useState(20);
  const [textValue, setTextValue] = useState("");
  const sliderInteractionTimer = useRef(null);
  const [isSliderInteracting, setIsSliderInteracting] = useState(false);
  const sliderAnimation = useRef(new Animated.Value(0)).current;

  const handleTextChange = (text) => {
    setTextValue(text);
  };

  const handleColorPress = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    // Set the slider interaction to false after 15 seconds of inactivity
    sliderInteractionTimer.current = setTimeout(() => {
      handleSliderInteraction(false);
    }, 8000);

    return () => {
      // Clear the timer on component unmount or re-render
      clearTimeout(sliderInteractionTimer.current);
    };
  }, [isSliderInteracting]);

  const handleSliderInteraction = (isInteracting) => {
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
  };

  return (
    <Modal visible={isModalVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={onCloseModalPress}
            >
              <Image source={BackIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() =>
                onDonePress(textValue, selectedColor, selectedSize)
              }
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            style={styles.editorContainer}
            behavior="padding"
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  zIndex: 1,
                  position: "absolute",
                  left: -120,
                }}
              >
                <Animated.View style={{ left: sliderAnimation }}>
                  <CustomSlider
                    value={selectedSize}
                    onValueChange={handleSizeChange}
                    onInteraction={handleSliderInteraction}
                  />
                </Animated.View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginHorizontal: HORIZONTAL_MARGIN,
                }}
              >
                <TextInput
                  style={[
                    styles.textInput,
                    { color: selectedColor },
                    { fontSize: selectedSize },
                  ]}
                  placeholder="Add text..."
                  placeholderTextColor={selectedColor ?? Colors.white}
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
                style={[styles.colorOption, { backgroundColor: Colors.white }]}
                onPress={() => handleColorPress(Colors.white)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.black }]}
                onPress={() => handleColorPress(Colors.black)}
              />

              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.green }]}
                onPress={() => handleColorPress(Colors.green)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.yellow }]}
                onPress={() => handleColorPress(Colors.yellow)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.colorOption,
                  { backgroundColor: Colors.darkPink },
                ]}
                onPress={() => handleColorPress(Colors.darkPink)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.red }]}
                onPress={() => handleColorPress(Colors.red)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.colorOption,
                  { backgroundColor: Colors.skyBlue },
                ]}
                onPress={() => handleColorPress(Colors.skyBlue)}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditPostTextModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: HORIZONTAL_MARGIN,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editorContainer: {
    justifyContent: "center",
    flex: 1,
  },
  textInput: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "600",
  },
  sidebar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  slider: {
    width: 250,
    height: 40,
    marginBottom: 20,
    zIndex: 999,
  },
  doneButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backIcon: {
    tintColor: Colors.white,
  },
});
