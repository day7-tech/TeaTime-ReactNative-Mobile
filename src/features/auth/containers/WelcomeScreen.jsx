import React, {useCallback} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import RecogniseIcon from '../../../../assets/images/recognise_icon.png';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_VERIFY_EMAIL_SCREEN} from '../../../navigators/RouteNames';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';

const WelcomeScreen = ({navigation}) => {
  const onTermPress = useCallback(() => {
    console.log('onTermPress');
  }, []);

  const onPrivacyPress = useCallback(() => {
    console.log('onPrivacyPress');
  }, []);

  const onGetStartedPress = useCallback(() => {
    navigation.navigate(ROUTE_VERIFY_EMAIL_SCREEN);
  }, [navigation]);
  return (
    <LinearGradient
      style={styles.gradient}
      colors={['#ff3d00', '#e42982', '#5a189a']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={RecogniseIcon} style={styles.image} />
          <Typography style={styles.title}>Enjoy the Moment</Typography>
        </View>
        <Pressable style={styles.buttonContainer} onPress={onGetStartedPress}>
          <Typography style={styles.buttonText}>Get Started</Typography>
        </Pressable>
        <Typography style={styles.infoText}>
          By continuing you agree to our{' '}
          <Typography onPress={onTermPress} style={styles.textButton}>
            Terms of Service{' '}
          </Typography>{' '}
          and{' '}
          <Typography onPress={onPrivacyPress} style={styles.textButton}>
            Privacy Policy
          </Typography>
        </Typography>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  gradient: {
    flex: 1,
  },
  title: {
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 41,
  },
  infoText: {
    marginHorizontal: 30,
    color: Colors.black,
    textAlign: 'center',
    fontSize: 13,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 140,
    width: 140,
  },
  buttonContainer: {
    backgroundColor: Colors.white,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: Colors.black,
    fontWeight: 'bold',
  },
  textButton: {
    fontWeight: '600',
    lineHeight: 0,
    fontSize: 13,
  },
});
