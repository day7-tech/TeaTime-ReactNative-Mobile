import React, {useCallback, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {generateDummyVideoPosts} from '../../../services/generateRandomContent';

/**
 * Component for rendering all posts.
 * @param {} props - Component props
 * @returns {JSX.Element} - AllPosts component
 */
const AllPosts = ({}) => {
  const [videos, setVideos] = useState(() => generateDummyVideoPosts(10));
  const [, setIsLoaded] = useState(false);
  const [, setLoadError] = useState(false);

  /**
   * Callback function for handling post press event.
   */
  const onPostPress = useCallback(() => {
    // Implement the logic for handling post press event
  }, []);

  /**
   * VideoThumbnail component for rendering a single video thumbnail.
   * @param {string} thumbnailUri - URI of the video thumbnail image
   * @param {object} item - Video item
   * @returns {JSX.Element} - VideoThumbnail component
   */
  const VideoThumbnail = useCallback(
    ({thumbnailUri, item}) => {
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
    },
    [onPostPress],
  );

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
