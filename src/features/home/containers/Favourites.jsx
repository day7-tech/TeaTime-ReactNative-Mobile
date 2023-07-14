import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import Feed from '../components/Feed';
import {useDispatch, useSelector} from 'react-redux';
import {getFavPosts} from '../../../api/homeApi';
import {appendFavPosts, setFavPosts} from '../store/HomeActions';
import {Colors} from '../../../utils/styles';
import Typography from '../../../components/Typography/Typography';
const numberOfItems = 5;

const Favourites = ({isFocused}) => {
  const {favPosts} = useSelector(state => state.home);
  const flatListRef = useRef(null);
  const tabBarHeight = useBottomTabBarHeight();
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [visibleItems, setVisibleItems] = useState([]);

  const fetchFavPosts = useCallback(async () => {
    try {
      const favPostsResponse = await getFavPosts(numberOfItems, page);
      if (
        Array.isArray(favPostsResponse.posts) &&
        favPostsResponse.posts.length > 0
      ) {
        dispatch(appendFavPosts(favPostsResponse.posts));
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, page]);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    console.log(viewableItems);
    setVisibleItems(viewableItems);
  }, []);

  const loadMoreFavPosts = () => {
    if (!isLoading && hasMoreData) {
      setIsLoading(true);
      fetchFavPosts();
    }
  };

  /**
   * Render video item.
   * @param {object} item - Video item.
   * @returns {JSX.Element} - Rendered video component.
   */
  const renderPost = ({item}) => {
    return (
      <Feed
        postId={item.id}
        isLiked={item.hasLikedPost}
        isFavourites={true}
        height={SCREEN_HEIGHT - tabBarHeight}
        currentVideoId={currentVideoId}
        isScrolling={isScrolling}
      />
    );
  };

  // Function to pause the first video
  const pauseFirstVideo = useCallback(() => {
    if (favPosts.length > 0 && visibleItems && visibleItems.length > 0) {
      const firstVisibleItem = visibleItems[0].item;
      if (currentVideoId !== firstVisibleItem.id) {
        setCurrentVideoId(null);
      }
    }
  }, [currentVideoId, favPosts.length, visibleItems]);
  // Function to play the first video
  const playFirstVideo = useCallback(() => {
    if (favPosts.length > 0 && visibleItems && visibleItems.length > 0) {
      const firstVisibleItem = visibleItems[0].item;
      if (currentVideoId !== firstVisibleItem.id) {
        setCurrentVideoId(firstVisibleItem.id);
      }
    }
  }, [currentVideoId, favPosts.length, visibleItems]);

  // Pause the first video when isFocused is false
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

      // Only update the current video ID when the active tab is "favourites"
      const visibleVideoIndex = Math.floor(scrollPosition / screenHeight);
      const visibleVideo = favPosts[visibleVideoIndex];
      if (visibleVideo) {
        setCurrentVideoId(visibleVideo.id);
      }
    },
    [favPosts],
  );

  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true);
  }, []);

  const handleScrollEnd = useCallback(() => {
    setIsScrolling(false);
  }, []);

  return (
    <View>
      {favPosts.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={favPosts}
          renderItem={renderPost}
          keyExtractor={item => item.key}
          onEndReached={loadMoreFavPosts}
          onEndReachedThreshold={0.2}
          snapToAlignment="start"
          decelerationRate={'fast'}
          snapToInterval={SCREEN_HEIGHT - tabBarHeight}
          showsVerticalScrollIndicator={false}
          initialNumToRender={1}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBegin}
          onScrollEndDrag={handleScrollEnd}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        />
      ) : (
        <Text>Loading</Text>
      )}
      {isLoading && <ActivityIndicator size="large" color={Colors.primary} />}
      {!isLoading && !hasMoreData && favPosts.length > 0 && (
        <Typography style={styles.infoText}>
          No more favourite posts available.
        </Typography>
      )}
    </View>
  );
};

export default React.memo(Favourites);
const styles = StyleSheet.create({
  infoText: {
    color: Colors.primary,
    fontSize: 16,
  },
});
