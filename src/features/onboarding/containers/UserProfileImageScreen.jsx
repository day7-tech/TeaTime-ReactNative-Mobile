import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';
import Typography from '../../../components/Typography/Typography';
import * as Progress from 'react-native-progress';
import {HORIZONTAL_MARGIN, SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import AddUserImage from '../components/AddUserImage';
import {ROUTE_AUTHENTICATED_NAVIGATOR} from '../../../navigators/RouteNames';

const UserProfileImageScreen = ({navigation, route}) => {
  const {name, password, dob} = route.params;
  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onCompletePress = useCallback(() => {
    navigation.navigate(ROUTE_AUTHENTICATED_NAVIGATOR);
  }, [navigation]);

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
          <AddUserImage />
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
