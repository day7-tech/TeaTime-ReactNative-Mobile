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
import {ROUTE_CREATE_PASSWORD_SCREEN} from '../../../navigators/RouteNames';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
const VerifyEmailScreen = ({navigation}) => {
  const [emailAddress, setEmailAddress] = useState('');

  const handleEmailChange = email => {
    setEmailAddress(email);
  };
  const onConfirmEmailPress = useCallback(() => {
    if (emailAddress.trim() === '') {
      console.log('Invalid email address');
      return;
    }

    // Navigate to the desired screen (replace 'ROUTE_CREATE_PASSWORD_SCREEN' with the actual route name)
    navigation.navigate(ROUTE_CREATE_PASSWORD_SCREEN, {emailAddress});
  }, [emailAddress, navigation]);

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
