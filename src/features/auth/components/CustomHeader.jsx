import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Back from '../../../components/Navigation/Back';
import BackArrowIcon from '../../../../assets/images/arrow-left.png';

const CustomHeader = () => {
  return (
    <View>
      <Back
        onPress={() => navigation.goBack()}
        backArrowImage={BackArrowIcon}
        iconStyle={styles.backIcon}
      />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
