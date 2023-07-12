import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import EditIcon from '../../../../assets/images/edit.png';
import InfoIcon from '../../../../assets/images/info.png';
import LogoutIcon from '../../../../assets/images/log-out.png';
import UserIcon from '../../../../assets/images/user.png';
import UsersIcon from '../../../../assets/images/users.png';
import {
  ROUTE_ACCOUNT_SETTINGS,
  ROUTE_AUTHENTICATION_NAVIGATOR,
  ROUTE_EDIT_PROFILE,
  ROUTE_MY_FAMILY,
} from '../../../navigators/RouteNames';
import {Colors} from '../../../utils/styles';
import SettingOptions from '../components/SettingOptions';
import {useDispatch} from 'react-redux';
import {LOGOUT} from '../../auth/store/AuthTypes';
import {logout} from '../../auth/store/AuthActions';
import {CommonActions} from '@react-navigation/native';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const onEditProfilePress = useCallback(() => {
    navigation.navigate(ROUTE_EDIT_PROFILE);
  }, [navigation]);

  const onMyFamilyGroupPress = useCallback(() => {
    navigation.navigate(ROUTE_MY_FAMILY);
  }, [navigation]);

  const onAccountSettingsPress = useCallback(() => {
    navigation.navigate(ROUTE_ACCOUNT_SETTINGS);
  }, [navigation]);

  const onAboutPress = useCallback(() => {}, []);
  const onLogoutPress = useCallback(() => {
    dispatch(logout());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: ROUTE_AUTHENTICATION_NAVIGATOR}], // Replace 'InitialScreen' with the name of your initial screen
      }),
    );
  }, [dispatch, navigation]);
  return (
    <View style={styles.container}>
      <SettingOptions
        optionIcon={UserIcon}
        optionName="Edit Profile"
        optionDetails={'Update your personal information'}
        onPress={onEditProfilePress}
      />
      <View style={styles.divider} />
      <SettingOptions
        optionIcon={UsersIcon}
        optionName="My Family groups"
        optionDetails={'Update your personal information'}
        onPress={onMyFamilyGroupPress}
      />
      <View style={styles.divider} />
      <SettingOptions
        optionIcon={EditIcon}
        optionName={'Account Settings'}
        optionDetails={'Update your personal information'}
        onPress={onAccountSettingsPress}
      />
      <View style={styles.divider} />
      <SettingOptions
        optionIcon={InfoIcon}
        optionName={'About'}
        optionDetails={'More Information'}
        onPress={onAboutPress}
      />
      <View style={styles.divider} />
      <SettingOptions
        optionIcon={LogoutIcon}
        optionName={'Logout'}
        onPress={onLogoutPress}
      />
      <View style={styles.divider} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.lightestGrey,
    marginVertical: 10,
    marginLeft: 64,
  },
  container: {
    paddingTop: 8,
  },
});
