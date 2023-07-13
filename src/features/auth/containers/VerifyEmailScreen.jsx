import {Formik} from 'formik';
import React, {useCallback, useState} from 'react';
import {Image, Keyboard, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import AppIcon from '../../../../assets/images/app-icon.png';
import {login, sendVerificationEmail} from '../../../api/authApi';
import AppFloatingTextInput from '../../../components/AppFloatingTextInput';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import Typography from '../../../components/Typography/Typography';
import {
  ROUTE_AUTHENTICATED_NAVIGATOR,
  ROUTE_VERIFICATION_CODE_SCREEN,
} from '../../../navigators/RouteNames';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import {
  setAuthData,
  setUserID,
  startLoading,
  stopLoading,
} from '../store/AuthActions';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().when('emailExists', {
    is: true,
    then: Yup.string().required('Password is required'),
  }),
});

const VerifyEmailScreen = ({navigation}) => {
  const {isLoading} = useSelector(state => state.auth);
  const [emailExists, setEmailExists] = useState(false);
  const dispatch = useDispatch();

  const onLoginPress = useCallback(
    async values => {
      try {
        dispatch(startLoading());
        const {email, password} = values;
        console.log(email, password);
        // Call the login API with email and password
        const loginResponse = await login(email, password);

        // Assuming the login response contains a success property
        if (loginResponse) {
          const {token, refreshToken, userId} = loginResponse; // Assuming the response contains the token and refresh token
          dispatch(setAuthData(token, refreshToken, userId)); // Set the authentication token in Redux
          // Handle the successful login and navigate to the desired screen
          console.log('Login successful');
          navigation.navigate(ROUTE_AUTHENTICATED_NAVIGATOR);
        } else {
          // Handle the case when login fails
          console.log('Login failed');
          // Handle error or display a message to the user accordingly
        }
      } catch (error) {
        console.error('Error logging in:', error);
        // Handle error or display a message to the user accordingly
      } finally {
        dispatch(stopLoading());
      }
    },
    [dispatch, navigation],
  );

  const onConfirmEmailPress = useCallback(
    async values => {
      const {email} = values;

      if (email.trim() === '') {
        console.log('Invalid email address');
        return;
      }

      try {
        dispatch(startLoading());
        const response = await sendVerificationEmail(email);

        if (response) {
          const {userId, code} = response;

          dispatch(setUserID(userId, email));
          navigation.navigate(ROUTE_VERIFICATION_CODE_SCREEN);
        } else {
          console.log('Failed to verify email.');
          // Handle error or display a message to the user accordingly
        }
      } catch (error) {
        console.log('error==>', error.response);
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === 'Account has already registered'
        ) {
          setEmailExists(true);
          console.log('Email already exists.', error.response.data);
          // Handle the case when email already exists
        } else {
          console.log('Error verifying email:', error);
          // Handle other errors or display a generic error message
        }
      } finally {
        dispatch(stopLoading());
      }
    },
    [dispatch, navigation],
  );

  const onSubmit = useCallback(
    async values => {
      Keyboard.dismiss();
      if (emailExists) {
        onLoginPress(values); // Call handleLogin if emailExists is true
      } else {
        onConfirmEmailPress(values); // Call onConfirmEmailPress if emailExists is false
      }
    },
    [emailExists, onConfirmEmailPress, onLoginPress],
  );

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
        <Formik
          initialValues={{email: 'Sid66@hotmail.com', password: 'cookies'}}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({
            submitForm,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <>
              <AppFloatingTextInput
                value={values.email}
                onChangeText={text => {
                  handleChange('email')(text);
                  if (emailExists) {
                    setEmailExists(false);
                    handleChange('password')('');
                  }
                }}
                onBlur={handleBlur('email')}
                placeholder={'Enter email address'}
                inputTextContainer={styles.inputTextContainer}
                returnKeyType={!emailExists ? 'done' : 'next'}
                error={touched.email && errors.email}
                errorText={errors.email}
                onSubmitEditing={!emailExists && submitForm}
              />
              {emailExists && (
                <>
                  <AppFloatingTextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder={'Password'}
                    inputTextContainer={styles.inputTextContainer}
                    secureTextEntry={true}
                    error={touched.password && errors.password}
                    errorText={errors.password}
                    returnKeyType="next"
                    onSubmitEditing={submitForm}
                  />
                </>
              )}
              <GradientBtn
                btnInfo={'Continue'}
                btnTextColor={Colors.white}
                onPress={submitForm}
                isLoading={isLoading}
              />
            </>
          )}
        </Formik>
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
  errorText: {
    marginTop: 5,
    color: Colors.red,
  },
});
