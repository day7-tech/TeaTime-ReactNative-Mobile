import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import Feed from '../components/Feed';
import {useSelector} from 'react-redux';

const Favourites = ({isFocused}) => {
  const {favPosts} = useSelector(state => state.home);
  const flatListRef = useRef(null);
  const tabBarHeight = useBottomTabBarHeight();
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  /**
   * Load more videos.
   * Generates additional video posts and appends them to the current list.
   */
  const loadMoreVideos = () => {
    //TODO: load more
  };

  /**
   * Render video item.
   * @param {object} item - Video item.
   * @returns {JSX.Element} - Rendered video component.
   */
  const renderPost = ({item}) => {
    return (
      <Feed
        item={item}
        isFavourites={true}
        height={SCREEN_HEIGHT - tabBarHeight}
        currentVideoId={currentVideoId}
        isScrolling={isScrolling}
      />
    );
  };

  // Function to pause the first video
  const pauseFirstVideo = useCallback(() => {
    if (favPosts.length > 0) {
      setCurrentVideoId(null);
    }
  }, [favPosts.length]);
  // Function to play the first video
  const playFirstVideo = useCallback(() => {
    if (favPosts.length > 0) {
      setCurrentVideoId(favPosts[0].id);
    }
  }, [favPosts]);

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
      <FlatList
        ref={flatListRef}
        data={favPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.5}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={SCREEN_HEIGHT - tabBarHeight}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
      />
    </View>
  );
};

export default React.memo(Favourites);
