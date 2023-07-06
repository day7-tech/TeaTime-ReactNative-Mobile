import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import AppIcon from '../../../../assets/images/app-icon.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography from '../../../components/Typography/Typography';
import {Colors} from '../../../utils/styles';
import AppFloatingTextInput from '../../../components/AppFloatingTextInput';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {
  ROUTE_CREATE_PASSWORD_SCREEN,
  ROUTE_VERIFICATION_CODE_SCREEN,
} from '../../../navigators/RouteNames';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import {sendVerificationEmail} from '../../../api/authApi';
import {useDispatch, useSelector} from 'react-redux';
import {setUserID, startLoading, stopLoading} from '../store/AuthActions';
const VerifyEmailScreen = ({navigation}) => {
  const [emailAddress, setEmailAddress] = useState('');
  const {isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleEmailChange = email => {
    setEmailAddress(email);
  };
  const onConfirmEmailPress = useCallback(async () => {
    if (emailAddress.trim() === '') {
      console.log('Invalid email address');
      return;
    }

    try {
      // Call the verifyEmail function from the authAPI module
      dispatch(startLoading());
      const response = await sendVerificationEmail(emailAddress);

      // Assuming the response data includes a success property indicating the success of the email verification
      if (response) {
        const {userId, code} = response;
        console.log('code===>', code);
        // Dispatch the setUserID action to store the userID in Redux
        dispatch(setUserID(userId, emailAddress));
        // Email verified successfully, navigate to the next screen
        navigation.navigate(ROUTE_VERIFICATION_CODE_SCREEN);
      } else {
        console.log('Failed to verify email.');
        // Handle error or display a message to the user accordingly
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      // Handle error or display a message to the user accordingly
    } finally {
      dispatch(stopLoading()); // Dispatch the stopLoading action in the finally block
    }
  }, [dispatch, emailAddress, navigation]);

  return (
    <KeyboardDismissWrapper style={styles.container} behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.upperContainer}>
          <Image source={AppIcon} style={styles.image} />
          <Typography style={styles.title}>Tea Time</Typography>
          <Typography style={styles.infoText}>
            Enter your email address. If you don’t have an account we’ll create
            one.
          </Typography>
        </View>

        <AppFloatingTextInput
          value={emailAddress}
          onChangeText={handleEmailChange}
          placeholder={'Enter email address'}
          inputTextContainer={styles.inputTextContainer}
          returnKeyType="done"
          onSubmitEditing={onConfirmEmailPress}
        />
        <GradientBtn
          btnInfo={'Continue'}
          btnTextColor={Colors.white}
          onPress={onConfirmEmailPress}
          isLoading={isLoading}
        />
      </SafeAreaView>
    </KeyboardDismissWrapper>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  image: {
    height: 100,
    width: 100,
  },
  title: {
    color: Colors.black,
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 30,
  },
  infoText: {
    color: Colors.black,
    textAlign: 'center',
    marginHorizontal: HORIZONTAL_MARGIN,
    fontSize: 17,
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  inputTextContainer: {
    marginBottom: 20,
  },
});
