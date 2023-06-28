import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {generateDummyVideoPosts} from '../../../services/generateRandomContent';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import Feed from '../components/Feed';

const Favourites = ({isFocused}) => {
  const [videos, setVideos] = useState(generateDummyVideoPosts(0, 10));
  const flatListRef = useRef(null);
  const tabBarHeight = useBottomTabBarHeight();
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  /**
   * Load more videos.
   * Generates additional video posts and appends them to the current list.
   */
  const loadMoreVideos = () => {
    const newVideos = [
      ...videos,
      ...generateDummyVideoPosts(videos.length, videos.length + 10),
    ];
    setVideos(newVideos);
  };

  /**
   * Render video item.
   * @param {object} item - Video item.
   * @returns {JSX.Element} - Rendered video component.
   */
  const renderVideo = ({item}) => {
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
    if (videos.length > 0) {
      setCurrentVideoId(null);
    }
  }, [videos.length]);
  // Function to play the first video
  const playFirstVideo = useCallback(() => {
    if (videos.length > 0) {
      setCurrentVideoId(videos[0].id);
    }
  }, [videos]);

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
      const visibleVideo = videos[visibleVideoIndex];
      if (visibleVideo) {
        setCurrentVideoId(visibleVideo.id);
      }
    },
    [videos],
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
        data={videos}
        renderItem={renderVideo}
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
