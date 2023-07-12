import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';
import {signUp} from '../../../api/authApi';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import Typography from '../../../components/Typography/Typography';
import {HORIZONTAL_MARGIN, SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import {startLoading, stopLoading} from '../../auth/store/AuthActions';
import AddUserImage from '../components/AddUserImage';

const UserProfileImageScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {firstName, lastName, password, dob} = route.params;
  const {userId} = useSelector(state => state.auth);
  const [profilePic, setProfilePicUri] = useState({});

  const handleImageSelect = imageObj => {
    setProfilePicUri(imageObj);
  };

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  console.log(profilePic);
  const onCompletePress = useCallback(async () => {
    try {
      dispatch(startLoading());

      const response = await signUp(
        password,
        firstName,
        lastName,
        dob,
        userId,
        profilePic,
      );
      // Handle the response or perform any necessary actions
      console.log('response=>', response);
      if (response) {
        navigation.popToTop();
      }
    } catch (error) {
      // Handle the error
    } finally {
      dispatch(stopLoading());
    }
  }, [
    dispatch,
    dob,
    firstName,
    lastName,
    navigation,
    password,
    profilePic,
    userId,
  ]);

  return (
    <KeyboardDismissWrapper style={styles.container} behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={onBackPress}>
          <Image source={BackArrowIcon} />
        </Pressable>
        <View style={styles.upperContainer}>
          <Typography style={styles.title}>Your Profile</Typography>
          <Progress.Bar
            progress={1}
            width={SCREEN_WIDTH - HORIZONTAL_MARGIN * 2}
            unfilledColor={Colors.grey}
            borderColor={Colors.grey}
            borderRadius={4}
            color={Colors.primary}
            style={styles.progressBarContainer}
          />
          <Typography style={styles.infoText}>
            Add a profile picture so others can identify who you are in the app
          </Typography>
          <AddUserImage onImageSelect={handleImageSelect} />
        </View>

        <GradientBtn
          btnInfo={'Complete'}
          btnTextColor={Colors.white}
          onPress={onCompletePress}
        />
      </SafeAreaView>
    </KeyboardDismissWrapper>
  );
};

export default UserProfileImageScreen;

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
    marginRight: HORIZONTAL_MARGIN,
  },
  upperContainer: {
    flex: 1,
  },
  progressBarContainer: {
    marginBottom: 30,
  },
});
