import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {useDispatch} from 'react-redux';
import PlayIcon from '../../../../assets/images/PlayIcon.png';
import {likePost, unlikePost} from '../../../api/homeApi';
import FeedDetails from '../../../components/FeedDetails';
import {
  ROUTE_AUTHENTICATED_NAVIGATOR,
  ROUTE_RECOGNITION_STACK_NAVIGATOR,
  ROUTE_RECOGNITION_STICKER_SCREEN,
  ROUTE_USER_DETAILS,
  ROUTE_USER_DETAILS_STACK_NAVIGATOR,
} from '../../../navigators/RouteNames';
import {
  DOUBLE_TAP_DELAY,
  HORIZONTAL_MARGIN,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import {updateLikeCount} from '../store/HomeActions';
import usePostDetails from '../../../hooks/usePostDetails';
import CommentsModal from './CommentsModal';

/**
 * Feed: Component for displaying a feed post.
 *
 * @param {object} post - The feed post object.
 * @param {boolean} isFavourites - Indicates if the feed post is in favorites.
 */
const Feed = ({
  postId,
  isLiked,
  isFavourites,
  height,
  currentVideoId,
  isScrolling,
}) => {
  const post = usePostDetails(postId, isFavourites);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const doubleTapRef = useRef(null);
  const doubleTapTimerRef = useRef(null);

  // Get the height of the bottom tab bar
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
      likeUnlikePost();
    } else {
      lastTapRef.current = now;
      doubleTapTimerRef.current = setTimeout(() => {
        clearTimeout(doubleTapTimerRef.current);
        doubleTapTimerRef.current = null;
        handlePlayPause();
      }, DOUBLE_TAP_DELAY);
    }
  }, [handlePlayPause, likeUnlikePost]);

  const likeUnlikePost = useCallback(() => {
    post.hasLikedPost ? handleUnlikePost() : handleLikePost();
  }, [handleLikePost, handleUnlikePost, post]);

  // Handle the like button press
  const handleLikePost = useCallback(async () => {
    try {
      const res = await likePost(postId);
      dispatch(updateLikeCount(res.postId, res.hasLikedPost));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, postId]);

  // Handle the unlike button press
  const handleUnlikePost = useCallback(async () => {
    try {
      const res = await unlikePost(postId);
      dispatch(updateLikeCount(res.postId, res.hasLikedPost));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, postId]);

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
              post: post,
              sticker,
            },
          },
        });
      }, 500);
    },
    [post, navigation, onModalClose],
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
          userDetails: post,
        },
      },
    });
  }, [post, navigation]);

  const onModalClose = useCallback(() => {
    recognitionModalRef?.current?.close();
  }, []);

  const onCommentsPress = useCallback(() => {
    commentsModalRef?.current?.present();
  }, []);

  const [shouldPlay, setShouldPlay] = useState(false);
  useEffect(() => {
    if (
      currentVideoId === postId &&
      isVideoLoaded &&
      isPlaying &&
      !isScrolling
    ) {
      setShouldPlay(true);
    } else {
      setShouldPlay(false);
    }
  }, [currentVideoId, isVideoLoaded, isPlaying, postId, isScrolling]);
  return (
    <View style={[styles.container, {height: height}]}>
      {post.mediaType === 'video' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleDoubleTap}
          ref={doubleTapRef}
          style={[styles.videoWrapper, {height: height, width: SCREEN_WIDTH}]}>
          {!shouldPlay ? (
            <Image source={PlayIcon} style={styles.playIcon} />
          ) : null}
          {/* Video component */}
          <Video
            ref={videoRef}
            source={{uri: convertToProxyURL(post.resource)}}
            style={styles.video}
            resizeMode={'cover'}
            paused={!shouldPlay}
            onLoad={handleVideoLoad}
            isMuted={false}
            volume={0.9}
            repeat={shouldPlay ? true : false}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleDoubleTap}
          style={[styles.videoWrapper, {height: height, width: SCREEN_WIDTH}]}>
          <Image
            source={{uri: post.resource}}
            style={styles.video}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      {/* Feed details section */}
      <View style={styles.postDetails}>
        <FeedDetails
          item={post}
          isFavourites={isFavourites}
          onThanksPress={onThanksPress}
          onUserDetailsPress={onUserDetailsPress}
          onCommentsPress={onCommentsPress}
        />
      </View>
      {/* Recognition stickers modal */}
      {/* <RecognitionStickersModal
        recognitionModalRef={recognitionModalRef}
        postDetails={post}
        stickers={Stickers}
        onSendStickerPress={onSendStickerPress}
        onModalClose={onModalClose}
      /> */}
      <CommentsModal commentsModalRef={commentsModalRef} postDetails={post} />
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
  playIcon: {
    position: 'absolute',
    height: 100,
    width: 100,
    top: SCREEN_HEIGHT / 2 - 50,
    left: SCREEN_WIDTH / 2 - 50,
    zIndex: 1,
  },
});
