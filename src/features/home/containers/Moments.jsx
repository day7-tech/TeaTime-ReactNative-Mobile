import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import {generateDummyVideoPosts} from '../../../services/generateRandomContent';
import {Colors} from '../../../utils/styles';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import Feed from '../components/Feed';
import {useDispatch, useSelector} from 'react-redux';
import {Largelist} from 'react-native-largelist-v3';
import {getMomentPostsByChannel} from '../../../api/homeApi';
import {appendMomentPosts, setMomentPosts} from '../store/HomeActions';
import Typography from '../../../components/Typography/Typography';
const channelId = '90f0abdb-951e-4186-bc70-bdcfb0f1e733';
const numberOfItems = 5;

const Moments = ({isFocused}) => {
  const {momentPosts} = useSelector(state => state.home);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [hasMoreData, setHasMoreData] = useState(true);

  // Create a reference to the FlatList component
  const flatListRef = useRef(null);

  // Get the height of the bottom tab bar using the useBottomTabBarHeight hook
  const tabBarHeight = useBottomTabBarHeight();

  const fetchMomentPosts = useCallback(async () => {
    const cursor =
      momentPosts.length > 0 ? momentPosts[momentPosts.length - 1].id : null;
    const momentPostsResponse = await getMomentPostsByChannel(
      channelId,
      numberOfItems,
      cursor,
    );
    if (
      Array.isArray(momentPostsResponse.posts) &&
      momentPostsResponse.posts.length > 0
    ) {
      dispatch(appendMomentPosts(momentPostsResponse.posts));
    } else {
      setHasMoreData(false);
    }
    try {
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, momentPosts]);

  // Function to load additional video posts when the user reaches the end of the list
  const loadMoreMomentsPost = () => {
    if (!isLoading && hasMoreData) {
      setIsLoading(true);
      fetchMomentPosts();
    }
  };
  // Function to render a single video post
  const renderPost = ({item}) => {
    return (
      <Feed
        item={item}
        postId={item.id}
        isFavourites={false}
        height={SCREEN_HEIGHT - tabBarHeight}
        currentVideoId={currentVideoId}
        isScrolling={isScrolling}
      />
    );
  };

  // Function to pause the first video
  const pauseFirstVideo = useCallback(() => {
    if (momentPosts.length > 0) {
      setCurrentVideoId(null);
    }
  }, [momentPosts.length]);

  // Function to play the first video
  const playFirstVideo = useCallback(() => {
    if (momentPosts.length > 0) {
      setCurrentVideoId(momentPosts[0].id);
    }
  }, [momentPosts]);

  // // Pause the first video when isFocused is false
  useEffect(() => {
    if (!isFocused) {
      pauseFirstVideo();
    } else {
      playFirstVideo();
    }
  }, [isFocused, pauseFirstVideo, playFirstVideo]);

  const handleScroll = useCallback(
    ({nativeEvent}) => {
      const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
      const screenHeight = layoutMeasurement.height;
      const scrollPosition = contentOffset.y;
      const visibleVideoIndex = Math.floor(scrollPosition / screenHeight);

      // Update the current video ID based on the visible video index
      const visibleVideo = momentPosts[visibleVideoIndex];
      if (visibleVideo) {
        setCurrentVideoId(visibleVideo.id);
      }
    },
    [momentPosts],
  );

  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true);
  }, []);

  const handleScrollEnd = useCallback(() => {
    setIsScrolling(false);
  }, []);

  return (
    <View>
      {/* <React.memo> */}
      {momentPosts.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={momentPosts}
          renderItem={renderPost}
          onEndReached={loadMoreMomentsPost}
          onEndReachedThreshold={0.5}
          keyExtractor={item => item.key}
          snapToAlignment="start"
          decelerationRate={'fast'}
          snapToInterval={SCREEN_HEIGHT - tabBarHeight}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBegin}
          onScrollEndDrag={handleScrollEnd}
          initialNumToRender={1}
        />
      ) : (
        <Text>Loading</Text>
      )}
      {isLoading && <ActivityIndicator size="large" color={Colors.primary} />}
      {!isLoading && !hasMoreData && momentPosts.length > 0 && (
        <Typography style={styles.infoText}>
          No more moment posts available.
        </Typography>
      )}
    </View>
  );
};

export default React.memo(Moments);

const styles = StyleSheet.create({
  infoText: {
    color: Colors.primary,
    fontSize: 16,
  },
});
