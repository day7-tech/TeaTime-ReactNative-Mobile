import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppFloatingTextInput from '../../../components/AppFloatingTextInput';
import Typography from '../../../components/Typography/Typography';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import Back from '../../../components/Navigation/Back';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';
import {ROUTE_VERIFICATION_CODE_SCREEN} from '../../../navigators/RouteNames';

const CreatePasswordScreen = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const {emailAddress} = route.params;

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onConfirmPasswordPress = useCallback(() => {
    navigation.navigate(ROUTE_VERIFICATION_CODE_SCREEN, {emailAddress});
  }, [emailAddress, navigation]);

  return (
    <KeyboardDismissWrapper style={styles.container} behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={onBackPress}>
          <Image source={BackArrowIcon} />
        </Pressable>
        <View style={styles.upperContainer}>
          <Typography style={styles.title}>Create a Password</Typography>
          <Typography style={styles.infoText}>
            Let’s create your password for
          </Typography>
          <Typography style={[styles.infoText, styles.emailValue]}>
            {emailAddress}
          </Typography>
          <AppFloatingTextInput
            value={password}
            onChangeText={setPassword}
            placeholder={'Password'}
            inputTextContainer={styles.inputTextContainer}
            secureTextEntry={true}
            returnKeyType="done"
            onSubmitEditing={onConfirmPasswordPress}
          />
        </View>

        <GradientBtn
          btnInfo={'Continue'}
          btnTextColor={Colors.white}
          onPress={onConfirmPasswordPress}
        />
      </SafeAreaView>
    </KeyboardDismissWrapper>
  );
};

export default CreatePasswordScreen;

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
  },
  inputTextContainer: {
    marginTop: 20,
  },
});
