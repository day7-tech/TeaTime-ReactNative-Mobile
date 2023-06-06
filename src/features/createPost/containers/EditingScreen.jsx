import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import CloseIcon from '../../../../assets/images/close.png';
import FavImage from '../../../../assets/images/favourites.png';
import DraggableImage from '../../../components/DraggableImage';
import Stickers from '../../../utils/Stickers';
import {
  HORIZONTAL_MARGIN,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import DraggableText from '../components/DraggableText';
import EditPostTextModal from '../components/EditPostTextModal';
import EditingOptions from '../components/EditingOptions';
import FiltersModal from '../components/FiltersModal';
import SongSelectionModal from '../components/SongSelectionModal';
import StickerSelectionModal from '../components/StickerSelectionModal';
import TrimVideoModal from '../components/TrimVideoModal';

const EditingScreen = ({route}) => {
  const navigation = useNavigation();
  const {fileUri, mediaType} = route.params;
  const [isTextModalVisible, setTextModalVisible] = useState(false);
  const [isMusicModalVisible, setMusicModalVisible] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [displayColor, setDisplayColor] = useState(Colors.white);
  const [displayTextSize, setDisplayTextSize] = useState(20);
  const songSelectionModalRef = useRef(null);
  const stickerSelectionModalRef = useRef(null);
  const trimVideoModalRef = useRef(null);
  const filtersModalRef = useRef(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [isVideoPlay, setIsVideoPlay] = useState(true);

  const onClosePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onTextPress = useCallback(() => {
    setTextModalVisible(true);
  }, []);

  const onCloseModalPress = useCallback(() => {
    setTextModalVisible(false);
  }, []);

  const onDoneTextEditingPress = useCallback(
    (textValue, selectedColor, selectedSize) => {
      setDisplayText(textValue);
      setDisplayColor(selectedColor);
      setDisplayTextSize(selectedSize);
      setTextModalVisible(false);
    },
    [],
  );

  const onMusicPress = useCallback(() => {
    songSelectionModalRef?.current?.present();
  }, []);

  const onSongSelectionModalClosePress = useCallback(() => {
    songSelectionModalRef?.current?.close();
  }, []);

  const onStickerPress = useCallback(() => {
    stickerSelectionModalRef?.current?.present();
  }, []);

  const onStickerSelectionModalClosePress = useCallback(() => {
    stickerSelectionModalRef?.current?.close();
  }, []);

  const onStickerSelectDonePress = useCallback(
    stickerKey => {
      onStickerSelectionModalClosePress();
      setTimeout(() => {
        setSelectedSticker(stickerKey);
      }, 500);
    },
    [onStickerSelectionModalClosePress],
  );

  const onSongSelectDonePress = useCallback(
    song => {
      onSongSelectionModalClosePress();
      setTimeout(() => {
        setSelectedSong(song);
      }, 500);
    },
    [onSongSelectionModalClosePress],
  );

  const onTrimVideoModalPress = useCallback(() => {
    trimVideoModalRef?.current?.present();
  }, []);

  const onCancelTrimVideoModalPress = useCallback(() => {
    trimVideoModalRef?.current?.close();
  }, []);

  const onFiltersModalPress = useCallback(() => {
    setIsVideoPlay(false);
    filtersModalRef?.current?.present();
  }, []);

  const onCloseFiltersModalPress = useCallback(() => {
    setIsVideoPlay(true);
    filtersModalRef?.current?.close();
  }, []);
  console.log('fileUri', fileUri);
  return (
    <SafeAreaView style={styles.container}>
      {mediaType === 'image' ? (
        <Image
          source={{uri: fileUri}}
          style={styles.media}
          resizeMode="cover"
        />
      ) : (
        <Video
          source={{uri: fileUri}}
          style={styles.media}
          resizeMode="cover"
          shouldPlay={isVideoPlay} // Set to false to pause the video initially
          isLooping={true}
        />
      )}
      <View style={styles.topContainer}>
        {!isTextModalVisible && (
          <Pressable onPress={onClosePress} style={styles.closeButton}>
            <Image source={CloseIcon} />
          </Pressable>
        )}
        {selectedSong && (
          <Pressable style={styles.songView} onPress={onMusicPress}>
            <Image source={FavImage} style={styles.songImage} />
          </Pressable>
        )}
      </View>
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {displayText && !isTextModalVisible && (
          <DraggableText
            inputValue={displayText}
            textColor={displayColor}
            fontSize={displayTextSize}
            onEditTextPress={onTextPress}
          />
        )}
        {selectedSticker && (
          <DraggableImage
            image={Stickers[selectedSticker]}
            onImagePress={() => console.log('Image')}
          />
        )}
      </View>
      {!isTextModalVisible && (
        <View style={styles.bottomContainer}>
          <EditingOptions
            onTextPress={onTextPress}
            onMusicPress={onMusicPress}
            onStickerPress={onStickerPress}
            onTrimPress={onTrimVideoModalPress}
            onFiltersPress={onFiltersModalPress}
            mediaType={mediaType}
          />
        </View>
      )}
      <EditPostTextModal
        isModalVisible={isTextModalVisible}
        onCloseModalPress={onCloseModalPress}
        onDonePress={onDoneTextEditingPress}
      />
      <SongSelectionModal
        songSelectionModalRef={songSelectionModalRef}
        onClosePress={onSongSelectionModalClosePress}
        onSongSelectDonePress={onSongSelectDonePress}
      />
      <StickerSelectionModal
        stickerSelectionModalRef={stickerSelectionModalRef}
        onClosePress={onStickerSelectionModalClosePress}
        onStickerSelectDonePress={onStickerSelectDonePress}
      />
      <TrimVideoModal
        trimVideoModalRef={trimVideoModalRef}
        fileUri={fileUri}
        onCancelTrimVideoModalPress={onCancelTrimVideoModalPress}
      />
      <FiltersModal
        filtersModalRef={filtersModalRef}
        fileUri={fileUri}
        onCloseModalPress={onCloseFiltersModalPress}
        mediaType={mediaType}
      />
    </SafeAreaView>
  );
};

export default EditingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  media: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    flex: 1,
  },
  closeButton: {
    padding: HORIZONTAL_MARGIN,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    marginBottom: 40,
  },
  songView: {
    borderColor: Colors.white,
    borderWidth: 2,
    position: 'absolute',
    left: (SCREEN_WIDTH - 30) / 2,
    borderRadius: 5,
  },
  songImage: {
    width: 30,
    height: 30,
  },
});
