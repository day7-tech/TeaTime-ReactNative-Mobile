import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {useDispatch, useSelector} from 'react-redux';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';
import {sendVerificationEmail, verifyCode} from '../../../api/authApi';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_CREATE_PASSWORD_SCREEN} from '../../../navigators/RouteNames';
import {HORIZONTAL_MARGIN, SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import {startLoading, stopLoading} from '../store/AuthActions';
const PIN_CODE_LENGTH = 5;

const VerificationCodeScreen = ({navigation, route}) => {
  const {email, userId, isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onResendPress = useCallback(async () => {
    try {
      // Call the verifyEmail function from the authAPI module
      dispatch(startLoading());
      const response = await sendVerificationEmail(email);

      // Assuming the response data includes a success property indicating the success of the email verification
      if (response) {
        const {code} = response;
        // Dispatch the setUserID action to store the userID in Redux
        // Email verified successfully, navigate to the next screen
        navigation.navigate(ROUTE_CREATE_PASSWORD_SCREEN);
      } else {
        console.log('Failed to resend code.');
        // Handle error or display a message to the user accordingly
      }
    } catch (error) {
      console.error('Error resending code:', error);
      // Handle error or display a message to the user accordingly
    } finally {
      dispatch(stopLoading()); // Dispatch the stopLoading action in the finally block
    }
  }, [dispatch, email, navigation]);

  const onFocus = useCallback(() => {
    setErrorMessage('');
    if (verificationCode.length === PIN_CODE_LENGTH) {
      setVerificationCode(verificationCode.slice(0, PIN_CODE_LENGTH - 1));
    }
  }, [verificationCode]);

  const onFulfill = () => {
    Keyboard.dismiss();
  };

  const onConfirmVerificationCodePress = useCallback(async () => {
    try {
      dispatch(startLoading());
      setTimeout(async () => {
        try {
          const response = await verifyCode(verificationCode, userId);
          if (response) {
            navigation.navigate(ROUTE_CREATE_PASSWORD_SCREEN);
          } else {
            console.log('Failed to verify email.');
          }
        } catch (error) {
          console.log(error.response);
          if (
            error.response &&
            error.response.status === 400 &&
            error.response.data === 'Invalid verification code'
          ) {
            setErrorMessage(error.response.data);
            // Handle the case when email already exists
          } else {
            console.error('Error verifying email:', error);
          }
          console.error('Error verifying email:', error);
        } finally {
          dispatch(stopLoading());
        }
      }, 0);
    } catch (error) {
      console.error('Error verifying email:', error);
      dispatch(stopLoading());
    }
  }, [dispatch, navigation, userId, verificationCode]);

  return (
    <KeyboardDismissWrapper style={styles.container} behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={onBackPress}>
          <Image source={BackArrowIcon} />
        </Pressable>
        <View style={styles.upperContainer}>
          <Typography style={styles.title}>Verification Code</Typography>
          <Typography style={styles.infoText}>
            Enter the code sent to
          </Typography>
          {email && (
            <Typography style={[styles.infoText, styles.emailValue]}>
              {email}
            </Typography>
          )}
          <SmoothPinCodeInput
            value={verificationCode}
            onTextChange={setVerificationCode}
            codeLength={PIN_CODE_LENGTH}
            restrictToNumbers
            onFocus={onFocus}
            onFulfill={onFulfill}
            cellStyle={styles.cell}
            cellStyleFocused={[styles.cell, styles.cellFocused]}
            textStyle={styles.cellText}
            containerStyle={styles.cellsContainer}
            cellSpacing={15}
            cellSize={(SCREEN_WIDTH - 50) / 6}
          />
          {errorMessage && (
            <Typography style={styles.errorText}>{errorMessage}</Typography>
          )}
        </View>
        <GradientBtn
          btnInfo={'Continue'}
          btnTextColor={Colors.white}
          onPress={onConfirmVerificationCodePress}
          isLoading={isLoading}
        />
        <Pressable style={styles.btnContainer} onPress={onResendPress}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Typography style={styles.btnText}>Resend</Typography>
          )}
        </Pressable>
      </SafeAreaView>
    </KeyboardDismissWrapper>
  );
};

export default VerificationCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  title: {
    color: Colors.black,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 30,
  },
  safeArea: {
    flex: 1,
  },
  upperContainer: {
    flex: 1,
  },
  infoText: {
    color: Colors.black,
    fontSize: 17,
  },
  emailValue: {
    fontWeight: '600',
    marginBottom: 40,
  },
  inputTextContainer: {
    marginTop: 20,
  },
  btnText: {
    letterSpacing: 0.7,
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'center',
  },
  btnContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },
  cell: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.lightestGrey,
    backgroundColor: Colors.grey,
  },
  cellFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primariesShade03,
  },
  cellText: {
    fontSize: 22,
    lineHeight: 40,
    textAlign: 'center',
    color: Colors.black,
    fontWeight: '600',
  },
  cellsContainer: {
    height: 65,
    width: SCREEN_WIDTH - 50,
  },
  errorText: {
    marginTop: 5,
    color: Colors.red,
  },
});
