import {Formik} from 'formik';
import React, {useCallback} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';
import AppFloatingTextInput from '../../../components/AppFloatingTextInput';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_USER_NAME_SCREEN} from '../../../navigators/RouteNames';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';

const CreatePasswordScreen = ({navigation, route}) => {
  const {email} = useSelector(state => state.auth);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = values => {
    try {
      navigation.navigate(ROUTE_USER_NAME_SCREEN, {
        password: values.password,
      });
    } catch (error) {
      console.log('Signup failed:', error);
    }
  };

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardDismissWrapper style={styles.container} behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
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
              <Pressable onPress={onBackPress}>
                <Image source={BackArrowIcon} />
              </Pressable>
              <View style={styles.upperContainer}>
                <Typography style={styles.title}>Create a Password</Typography>
                <Typography style={styles.infoText}>
                  Let’s create your password for
                </Typography>
                <Typography style={[styles.infoText, styles.emailValue]}>
                  {email}
                </Typography>

                <AppFloatingTextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={'Password'}
                  inputTextContainer={styles.inputTextContainer}
                  secureTextEntry={true}
                  returnKeyType="next"
                />
                {touched.password && errors.password && (
                  <Typography style={styles.errorText}>
                    {errors.password}
                  </Typography>
                )}

                <AppFloatingTextInput
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder={'Confirm Password'}
                  inputTextContainer={styles.inputTextContainer}
                  secureTextEntry={true}
                  returnKeyType="done"
                  onSubmitEditing={submitForm}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Typography style={styles.errorText}>
                    {errors.confirmPassword}
                  </Typography>
                )}
              </View>

              <GradientBtn
                btnInfo={'Continue'}
                btnTextColor={Colors.white}
                onPress={submitForm}
              />
            </>
          )}
        </Formik>
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
  errorText: {
    marginTop: 5,
    color: Colors.red,
  },
});
