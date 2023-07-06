import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography from '../../../components/Typography/Typography';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';
import {HORIZONTAL_MARGIN, SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {
  ROUTE_CREATE_PASSWORD_SCREEN,
  ROUTE_USER_NAME_SCREEN,
} from '../../../navigators/RouteNames';
import {useDispatch, useSelector} from 'react-redux';
import {startLoading, stopLoading} from '../store/AuthActions';
import {sendVerificationEmail, verifyCode} from '../../../api/authApi';
import {debounce} from 'lodash';
import GradientBtn from '../../../components/Buttons/GradientBtn';
const PIN_CODE_LENGTH = 6;

const VerificationCodeScreen = ({navigation, route}) => {
  const {email, userId, isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState('');

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
        console.log('code===>', code);
        // Dispatch the setUserID action to store the userID in Redux
        // Email verified successfully, navigate to the next screen
        navigation.navigate(ROUTE_CREATE_PASSWORD_SCREEN);
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
  }, [dispatch, email, navigation]);

  const onFocus = useCallback(() => {
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
            cellSize={(SCREEN_WIDTH - 50) / 7}
          />
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
});
