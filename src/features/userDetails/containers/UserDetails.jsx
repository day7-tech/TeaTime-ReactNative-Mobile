import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MoreIcon from '../../../../assets/images/more-vertical.png';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_USER_POST_DETAILS} from '../../../navigators/RouteNames';
import {
  generateDummyVideoPosts,
  lorem,
} from '../../../services/generateRandomContent';
import {Colors} from '../../../utils/styles';

/**
 * Component that displays user details and their uploaded videos.
 * @param {object} route - The route object passed from the navigator.
 * @param {object} navigation - The navigation object provided by the navigator.
 * @returns {JSX.Element} - The UserDetails component.
 */
const UserDetails = ({route, navigation}) => {
  const {userDetails} = route.params;
  const [videos, setVideos] = useState(() => generateDummyVideoPosts(10));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: userDetails.uploader.name,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => console.log('more')}
          style={[styles.hitArea]}>
          <Image source={MoreIcon} style={styles.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, userDetails.uploader.name]);

  const onPostPress = useCallback(
    item => {
      navigation.navigate(ROUTE_USER_POST_DETAILS, {item});
    },
    [navigation],
  );

  /**
   * Component that renders a video thumbnail.
   * @param {string} thumbnailUri - The URI of the video thumbnail.
   * @returns {JSX.Element} - The VideoThumbnail component.
   */
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
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: userDetails.uploader.image}}
        style={styles.channelAvatar}
      />
      <Typography style={[styles.uploaderName]}>
        {userDetails.uploader.name}
      </Typography>

      <Typography numberOfLines={2} ellipsizeMode="tail" style={styles.info}>
        {lorem(20)}
      </Typography>
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
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  hitArea: {
    height: '100%',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 15,
  },
  channelAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 'auto',
    marginTop: 15,
  },
  uploaderName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    paddingLeft: 25,
    paddingRight: 25,
    color: Colors.black,
    textAlign: 'center',
  },
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
