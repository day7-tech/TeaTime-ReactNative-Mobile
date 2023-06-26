import React, {useCallback} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_RECOGNITION_SUCCESS_SCREEN} from '../../../navigators/RouteNames';
import Stickers from '../../../utils/Stickers';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';

/**
 * Component that renders the screen for sending a recognition sticker.
 * @param {object} route - The route object passed from the navigator.
 * @param {object} navigation - The navigation object provided by the navigator.
 * @returns {JSX.Element} - The SendRecognitionSticker component.
 */
const SendRecognitionSticker = ({route, navigation}) => {
  const {post, sticker} = route.params;

  /**
   * Function that dismisses the keyboard and navigates to the recognition success screen.
   */
  const send = useCallback(() => {
    Keyboard.dismiss();
    navigation.navigate(ROUTE_RECOGNITION_SUCCESS_SCREEN, {post});
  }, [navigation, post]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* Title of the screen */}
        <Typography style={styles.title}>Sending your sticker</Typography>
        {/* Container for the recognition sticker image */}
        <View style={styles.imageContainer}>
          <Image source={Stickers[sticker]} style={styles.stickerImage} />
        </View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? getBottomSpace() : 0}>
          <View
            style={{
              marginHorizontal: HORIZONTAL_MARGIN,
            }}>
            {/* Container for the input text */}
            <View style={styles.inputTextContainer}>
              <TextInput
                style={styles.input}
                placeholder="Send a message"
                placeholderTextColor={Colors.lightGrey}
                multiline={true}
                numberOfLines={4}
              />
              {/* Optional text to explain the input field */}
              <Typography style={styles.optionalText}>Optional</Typography>
            </View>
            {/* Button to send the recognition sticker */}
            <View>
              <GradientBtn btnInfo="Send" btnTextColor="white" onPress={send} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SendRecognitionSticker;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.black,
  },
  stickerImage: {
    height: 180,
    width: 180,
  },
  title: {
    fontSize: 16,
    margin: HORIZONTAL_MARGIN,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Outfit-Regular',
    color: Colors.lightGrey,
    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 10,
    height: 180,
    textAlignVertical: 'top',
    borderColor: Colors.lightGrey,
    borderWidth: 0.25,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionalText: {
    textAlign: 'center',
    color: Colors.lightGrey,
    marginVertical: 15,
  },
  inputTextContainer: {
    marginVertical: 20,
  },
});
