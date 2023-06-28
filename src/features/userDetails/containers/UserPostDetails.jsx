import React, {useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import BackIcon from '../../../../assets/images/back.png';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import Feed from '../../home/components/Feed';

const UserPostDetails = ({route, navigation}) => {
  const {item} = route.params;

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={onBackPress} style={styles.back}>
        <Image source={BackIcon} style={styles.icon} />
      </TouchableOpacity>
      <Feed item={item} isFavourites={true} height={SCREEN_HEIGHT} />
    </View>
  );
};

export default UserPostDetails;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    tintColor: Colors.black,
  },
  back: {
    position: 'absolute',
    left: 20,
    top: 70,
    zIndex: 1,
  },
});
