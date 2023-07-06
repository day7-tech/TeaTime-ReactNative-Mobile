import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';
import DropDownIcon from '../../../../assets/images/dropdown.png';
import AppFloatingTextInput from '../../../components/AppFloatingTextInput';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_USER_PROFILE_IMAGE_SCREEN} from '../../../navigators/RouteNames';
import {HORIZONTAL_MARGIN, SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';

const UserBirthDateScreen = ({navigation, route}) => {
  const {name, password} = route.params;
  const [birthDate, setBirthDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onSubmitPress = useCallback(() => {
    navigation.navigate(ROUTE_USER_PROFILE_IMAGE_SCREEN, {
      name: name,
      password: password,
      dob: birthDate,
    });
  }, [birthDate, name, navigation, password]);

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setBirthDate(date);
    hideDatePicker();
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <KeyboardDismissWrapper style={styles.container} behavior="padding">
        <SafeAreaView style={styles.safeArea}>
          <Pressable onPress={onBackPress}>
            <Image source={BackArrowIcon} />
          </Pressable>
          <View style={styles.upperContainer}>
            <Typography style={styles.title}>Your Birth Date</Typography>
            <Progress.Bar
              progress={0.6}
              width={SCREEN_WIDTH - HORIZONTAL_MARGIN * 2}
              unfilledColor={Colors.grey}
              borderColor={Colors.grey}
              borderRadius={4}
              color={Colors.primary}
              style={styles.progressBarContainer}
              indeterminateAnimationDuration={500}
              height={8}
            />

            <Typography style={styles.infoText}>
              Please enter your date of birth
            </Typography>
            <View>
              <View style={styles.hiddenTouchable} pointerEvents="box-none">
                <Pressable
                  onPress={showDatePicker}
                  style={styles.touchableOverlay}
                />
              </View>
              <AppFloatingTextInput
                value={formatDate(birthDate)}
                placeholder={'Birthday'}
                inputTextContainer={styles.inputTextContainer}
                rightComponent={<Image source={DropDownIcon} />}
                editable={false}
                returnKeyType="done"
              />
            </View>
          </View>

          <GradientBtn
            btnInfo={'Continue'}
            btnTextColor={Colors.white}
            onPress={onSubmitPress}
          />
        </SafeAreaView>
      </KeyboardDismissWrapper>
      <DatePicker
        modal
        mode="date"
        open={isDatePickerVisible}
        date={birthDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </>
  );
};

export default UserBirthDateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 30,
  },
  infoText: {
    color: Colors.black,
    fontSize: 17,
  },
  inputTextContainer: {
    marginTop: 20,
  },
  upperContainer: {
    flex: 1,
  },
  progressBarContainer: {
    marginBottom: 30,
  },
  hiddenTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  touchableOverlay: {
    width: '100%',
    height: 56,
    backgroundColor: 'transparent',
  },
});
