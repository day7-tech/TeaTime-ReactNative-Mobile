import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography from '../../../components/Typography/Typography';
import AppFloatingTextInput from '../../../components/AppFloatingTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import {Colors} from '../../../utils/styles';
import {
  HORIZONTAL_MARGIN,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../utils/constants';
import * as Progress from 'react-native-progress';
import {ROUTE_USER_BIRTHDATE_SCREEN} from '../../../navigators/RouteNames';

const UserNameScreen = ({navigation}) => {
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });

  const handleSubmit = values => {
    // Handle form submission
    console.log(values);
    navigation.navigate(ROUTE_USER_BIRTHDATE_SCREEN);
  };
  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const lastNameRef = useRef(null);
  return (
    <KeyboardDismissWrapper style={styles.container} behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <Formik
          initialValues={{firstName: '', lastName: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <>
              <View style={styles.upperContainer}>
                <Typography style={styles.title}>
                  Welcome to Tea Time
                </Typography>
                <Progress.Bar
                  progress={0.3}
                  width={SCREEN_WIDTH - HORIZONTAL_MARGIN * 2}
                  unfilledColor={Colors.grey}
                  borderColor={Colors.grey}
                  borderRadius={4}
                  color={Colors.primary}
                  style={styles.progressBarContainer}
                />

                <Typography style={styles.infoText}>
                  What should we call you?
                </Typography>
                <AppFloatingTextInput
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  placeholder={'Enter first name'}
                  inputTextContainer={styles.inputTextContainer}
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                  returnKeyType="next"
                />
                {errors.firstName && touched.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
                <AppFloatingTextInput
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  placeholder={'Enter last name'}
                  inputTextContainer={styles.inputTextContainer}
                  returnKeyType="done"
                  ref={lastNameRef}
                  onSubmitEditing={handleSubmit}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>

              <GradientBtn
                btnInfo={'Continue'}
                btnTextColor={Colors.white}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </SafeAreaView>
    </KeyboardDismissWrapper>
  );
};

export default UserNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  safeArea: {
    flex: 1,
    paddingTop: 25,
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
  errorText: {
    marginTop: 5,
    color: Colors.red,
  },
});
