import React, {useCallback, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {generateDummyVideoPosts} from '../../../services/generateRandomContent';

const AllPosts = ({}) => {
  const [videos, setVideos] = useState(() => generateDummyVideoPosts(10));

  const onPostPress = useCallback(() => {
    console.log('Hello');
  }, []);
  const VideoThumbnail = ({thumbnailUri, item}) => {
    const [, setIsLoaded] = useState(false);
    const [, setLoadError] = useState(false);

    return (
      <Pressable
        style={styles.thumbnailContainer}
        onPress={() => onPostPress(item)}>
        <Image
          source={{uri: thumbnailUri}}
          style={styles.thumbnail}
          resizeMode={'cover'}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
            setLoadError(true);
          }}
        />
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={videos}
        renderItem={({item}) => (
          <VideoThumbnail thumbnailUri={item.thumbnail} item={item} />
        )}
        keyExtractor={item => `${item.id}`}
        numColumns={2}
        style={{width: '100%', marginTop: 10}}
        onEndReached={() =>
          setVideos(vids => [...vids, ...generateDummyVideoPosts(10)])
        }
      />
    </View>
  );
};

export default AllPosts;

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
    aspectRatio: 9 / 16,
  },
  thumbnailContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    width: '50%',
  },
});
