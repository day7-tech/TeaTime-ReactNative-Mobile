import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import FeedDetails from '../../../components/FeedDetails';
import {
  ROUTE_AUTHENTICATED_NAVIGATOR,
  ROUTE_RECOGNITION_STACK_NAVIGATOR,
  ROUTE_RECOGNITION_STICKER_SCREEN,
  ROUTE_USER_DETAILS,
  ROUTE_USER_DETAILS_STACK_NAVIGATOR,
} from '../../../navigators/RouteNames';
import Stickers from '../../../utils/Stickers';
import {
  DOUBLE_TAP_DELAY,
  HORIZONTAL_MARGIN,
  SCREEN_WIDTH,
} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import RecognitionStickersModal from '../../recognition/containers/RecognitionStickersModal';
import CommentsModal from './CommentsModal';

/**
 * Feed: Component for displaying a feed item.
 *
 * @param {object} item - The feed item object.
 * @param {boolean} isFavourites - Indicates if the feed item is in favorites.
 */
const Feed = ({item, isFavourites, height, currentVideoId, isScrolling}) => {
  console.log('item', item);
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const doubleTapRef = useRef(null);
  const doubleTapTimerRef = useRef(null);

  // Get the height of the bottom tab bar
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const recognitionModalRef = useRef(null);
  const commentsModalRef = useRef(null);

  const lastTapRef = useRef(null);

  /**
   * Handle double tap event.
   * If the user taps twice within a certain delay, it triggers a double tap.
   * Otherwise, it triggers a single tap.
   */
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();

    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      clearTimeout(doubleTapTimerRef.current);
      doubleTapTimerRef.current = null;
      handleLike();
    } else {
      lastTapRef.current = now;
      doubleTapTimerRef.current = setTimeout(() => {
        clearTimeout(doubleTapTimerRef.current);
        doubleTapTimerRef.current = null;
        handlePlayPause();
      }, DOUBLE_TAP_DELAY);
    }
  }, [handleLike, handlePlayPause]);

  /**
   * Handle the Like button press.
   * It toggles the like status and updates the like count accordingly.
   */
  const handleLike = useCallback(() => {
    setLike(prevLike => {
      const newLike = !prevLike;
      setLikeCount(prevCount => (newLike ? prevCount + 1 : prevCount - 1));
      return newLike;
    });
  }, []);

  /**
   * Handle the Play/Pause button press.
   * It toggles the video playback state.
   */
  const handlePlayPause = useCallback(() => {
    if (!isScrolling) {
      setIsPlaying(prev => !prev);
    }
  }, [isScrolling]);

  /**
   * Handle the video load event.
   * Sets the video as loaded and starts playing.
   */
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    if (!isScrolling) {
      setIsPlaying(true);
    }
  }, [isScrolling]);

  /**
   * Handle the Thanks button press.
   * Opens the recognition modal.
   */
  const onThanksPress = useCallback(() => {
    recognitionModalRef?.current?.present();
  }, []);

  /**
   * Handle the Send Sticker button press.
   * Navigates to the recognition sticker screen.
   *
   * @param {string} sticker - The selected sticker.
   */
  const onSendStickerPress = useCallback(
    sticker => {
      onModalClose();
      setTimeout(() => {
        navigation.navigate(ROUTE_AUTHENTICATED_NAVIGATOR, {
          screen: ROUTE_RECOGNITION_STACK_NAVIGATOR,
          params: {
            screen: ROUTE_RECOGNITION_STICKER_SCREEN,
            params: {
              post: item,
              sticker,
            },
          },
        });
      }, 500);
    },
    [item, navigation, onModalClose],
  );

  /**
   * Handle the User Details button press.
   * Navigates to the user details screen.
   */
  const onUserDetailsPress = useCallback(() => {
    navigation.navigate(ROUTE_AUTHENTICATED_NAVIGATOR, {
      screen: ROUTE_USER_DETAILS_STACK_NAVIGATOR,
      params: {
        screen: ROUTE_USER_DETAILS,
        params: {
          userDetails: item,
        },
      },
    });
  }, [item, navigation]);

  const onModalClose = useCallback(() => {
    recognitionModalRef?.current?.close();
  }, []);

  const onCommentsPress = useCallback(() => {
    commentsModalRef?.current?.present();
  }, []);

  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (
      currentVideoId === item.id &&
      isVideoLoaded &&
      isPlaying &&
      !isScrolling
    ) {
      setShouldPlay(true);
    } else {
      setShouldPlay(false);
    }
  }, [currentVideoId, isVideoLoaded, isPlaying, item.id, isScrolling]);

  return (
    <View style={[styles.container, {height: height}]}>
      {/* Touchable video wrapper */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleDoubleTap}
        ref={doubleTapRef}
        style={[styles.videoWrapper, {height: height, width: SCREEN_WIDTH}]}>
        {/* Video component */}
        <Video
          ref={videoRef}
          source={{uri: item.uri}}
          style={styles.video}
          resizeMode={'cover'}
          paused={!shouldPlay}
          onLoad={handleVideoLoad}
          isMuted={false}
          volume={0.9}
          repeat={shouldPlay ? true : false}
        />
      </TouchableOpacity>
      {/* Feed details section */}
      {/* <View style={styles.postDetails}>
        <FeedDetails
          item={item}
          defaultLikes={likeCount}
          isLiked={like}
          isFavourites={isFavourites}
          onThanksPress={onThanksPress}
          onUserDetailsPress={onUserDetailsPress}
          onCommentsPress={onCommentsPress}
        />
      </View> */}
      {/* Recognition stickers modal */}
      <RecognitionStickersModal
        recognitionModalRef={recognitionModalRef}
        postDetails={item}
        stickers={Stickers}
        onSendStickerPress={onSendStickerPress}
        onModalClose={onModalClose}
      />
      <CommentsModal commentsModalRef={commentsModalRef} userDetails={item} />
    </View>
  );
};

export default React.memo(Feed);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  videoWrapper: {
    position: 'absolute',
  },
  video: {
    flex: 1,
  },
  postDetails: {
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  visibleChecker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    opacity: 0,
  },
});
