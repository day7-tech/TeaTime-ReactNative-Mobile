import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import SettingOptions from '../components/SettingOptions';
import {Colors} from '../../../utils/styles';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';

const AccountSettings = () => {
  const onEmailAddressPress = useCallback(() => {}, []);
  const onMobileNumberPress = useCallback(() => {}, []);
  return (
    <View style={styles.container}>
      <SettingOptions
        optionName="Email address"
        optionDetails={'emailaddress@gmail.com'}
        onPress={onEmailAddressPress}
      />
      <View style={styles.divider} />
      <SettingOptions
        optionName="Mobile number"
        optionDetails={'Add a phone number'}
        onPress={onMobileNumberPress}
      />
      <View style={styles.divider} />
      <SettingOptions optionName="Password" onPress={onMobileNumberPress} />
      <View style={styles.subContainer}>
        <SettingOptions optionName="Logout" onPress={onMobileNumberPress} />
        <View style={styles.divider} />
        <SettingOptions
          optionNameStyle={styles.deleteText}
          optionName="Delete account"
          onPress={onMobileNumberPress}
        />
      </View>
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    marginLeft: HORIZONTAL_MARGIN,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightestGrey,
    marginVertical: 8,
  },
  subContainer: {
    marginTop: 25,
  },
  deleteText: {
    color: Colors.red,
  },
});
