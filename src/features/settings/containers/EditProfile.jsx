import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useLayoutEffect} from 'react';
import AddUserImage from '../../onboarding/components/AddUserImage';
import Typography from '../../../components/Typography/Typography';
import {Colors} from '../../../utils/styles';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AppFloatingTextInput from '../../../components/AppFloatingTextInput';
import KeyboardDismissWrapper from '../../../components/KeyboardDismissWrapper';
import {useSelector} from 'react-redux';

const EditProfile = ({navigation}) => {
  const {userDetails} = useSelector(state => state.profile);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit} style={[styles.hitArea]}>
          <Typography style={styles.saveText}>Save</Typography>
        </TouchableOpacity>
      ),
    });
  }, [handleSubmit, navigation]);

  const handleSubmit = useCallback(
    values => {
      // Handle form submission
      console.log(values);
      navigation.navigate();
    },
    [navigation],
  );

  return (
    <KeyboardDismissWrapper style={styles.container} behavior="padding">
      <AddUserImage image={userDetails.profilePicResource} />
      <View style={styles.contentContainer}>
        <Typography style={styles.title}>About You</Typography>
        <Formik
          initialValues={{
            firstName: userDetails.firstName ?? '',
            lastName: userDetails.lastName ?? '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({values, handleChange, errors, touched}) => (
            <>
              <AppFloatingTextInput
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                placeholder={'Enter first name'}
                inputTextContainer={styles.inputTextContainer}
              />
              {errors.firstName && touched.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
              <AppFloatingTextInput
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                placeholder={'Enter last name'}
                inputTextContainer={styles.inputTextContainer}
              />
              {errors.lastName && touched.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </>
          )}
        </Formik>
      </View>
    </KeyboardDismissWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 17,
  },
  contentContainer: {
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: 10,
  },

  saveText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 17,
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  inputTextContainer: {
    marginTop: 20,
  },
});
