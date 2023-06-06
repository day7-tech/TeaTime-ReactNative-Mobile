import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {options} from '../../../utils/constants';
import BottomBarOptions from '../components/BottomBarOptions';
import Notes from './Notes';
import Post from './Post';
import Video from './Video';

const CreatePostOptions = ({navigation}) => {
  const [postType, setPostType] = useState('post');

  const onClosePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderCreatePostOption = useCallback(
    postType => {
      switch (postType) {
        case 'post':
          return <Post onClosePress={onClosePress} />;
        case 'video':
          return <Video onClosePress={onClosePress} />;
        case 'notes':
          return <Notes />;
      }
    },
    [onClosePress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexGrow: 1}}>{renderCreatePostOption(postType)}</View>
      <BottomBarOptions
        options={options}
        setValue={setPostType}
        value={postType}
      />
    </SafeAreaView>
  );
};

export default CreatePostOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
});
