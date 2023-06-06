import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { generateDummyVideoPosts } from "../../../services/generateRandomContent";
import { SCREEN_HEIGHT } from "../../../utils/constants";
import Feed from "../components/Feed";

const Moments = ({ isFocused }) => {
  const [videos, setVideos] = React.useState(generateDummyVideoPosts(0, 10));
  const [currentVideoId, setCurrentVideoId] = useState(null);

  // Create a reference to the FlatList component
  const flatListRef = useRef(null);

  // Get the height of the bottom tab bar using the useBottomTabBarHeight hook
  const tabBarHeight = useBottomTabBarHeight();

  // Function to load additional video posts when the user reaches the end of the list
  const loadMoreVideos = () => {
    // Generate additional video posts and append them to the current list
    const newVideos = [
      ...videos,
      ...generateDummyVideoPosts(videos.length, videos.length + 10),
    ];
    setVideos(newVideos);
  };
  // Function to render a single video post
  const renderVideo = ({ item }) => {
    return (
      <Feed
        item={item}
        isFavourites={false}
        height={SCREEN_HEIGHT - tabBarHeight}
        currentVideoId={currentVideoId}
      />
    );
  };

  // Function to pause the first video
  const pauseFirstVideo = () => {
    if (videos.length > 0) {
      setCurrentVideoId(null);
    }
  };

  // Function to play the first video
  const playFirstVideo = () => {
    if (videos.length > 0) {
      setCurrentVideoId(videos[0].id);
    }
  };

  // Pause the first video when isFocused is false
  useEffect(() => {
    if (!isFocused) {
      pauseFirstVideo();
    } else {
      playFirstVideo();
    }
  }, [isFocused]);

  const handleScroll = useCallback(
    ({ nativeEvent }) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const screenHeight = layoutMeasurement.height;
      const scrollPosition = contentOffset.y;
      const visibleVideoIndex = Math.floor(scrollPosition / screenHeight);

      // Update the current video ID based on the visible video index
      const visibleVideo = videos[visibleVideoIndex];
      if (visibleVideo) {
        setCurrentVideoId(visibleVideo.id);
      }
    },
    [videos]
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideo}
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => `${item.id}`}
        // Set the behavior for snapping to the start of each video post
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={SCREEN_HEIGHT - tabBarHeight}
        // Hide the vertical scroll bar
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      />
    </View>
  );
};

export default React.memo(Moments);

const styles = StyleSheet.create({});
