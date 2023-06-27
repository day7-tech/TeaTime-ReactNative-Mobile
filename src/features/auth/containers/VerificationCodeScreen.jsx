import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography from '../../../components/Typography/Typography';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';
import {HORIZONTAL_MARGIN, SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {ROUTE_USER_NAME_SCREEN} from '../../../navigators/RouteNames';
const PIN_CODE_LENGTH = 5;

const VerificationCodeScreen = ({navigation, route}) => {
  const {emailAddress} = route.params;
  const [verificationCode, setVerificationCode] = useState('');

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onResendPress = useCallback(() => {}, []);

  const onFocus = useCallback(() => {
    if (verificationCode.length === PIN_CODE_LENGTH) {
      setVerificationCode(verificationCode.slice(0, PIN_CODE_LENGTH - 1));
    }
  }, [verificationCode]);

  const onFulfill = () => {
    Keyboard.dismiss();
    navigation.navigate(ROUTE_USER_NAME_SCREEN);
  };

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
          <Typography style={[styles.infoText, styles.emailValue]}>
            {emailAddress}
          </Typography>
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
        </View>
        <Pressable style={styles.btnContainer} onPress={onResendPress}>
          <Typography style={styles.btnText}>Resend</Typography>
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
