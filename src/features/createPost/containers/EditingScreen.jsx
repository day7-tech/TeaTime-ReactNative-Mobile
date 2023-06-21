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
import Typography from '../../../components/Typography/Typography';

const EditingScreen = ({route}) => {
  const navigation = useNavigation();
  const {fileUri, mediaType} = route.params;
  const [isTextModalVisible, setTextModalVisible] = useState(false);
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

  const onDonePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
          isMuted={false}
          volume={0.9}
          repeat={true}
        />
      )}
      <View style={styles.topContainer}>
        {!isTextModalVisible && (
          <Pressable onPress={onClosePress} style={styles.closeButton}>
            <Image source={CloseIcon} />
          </Pressable>
        )}
        {selectedSong && (
          <Pressable onPress={onMusicPress} style={styles.songContainer}>
            <View style={styles.songView}>
              <Image source={FavImage} style={styles.songImage} />
            </View>
            <Typography style={styles.songText}>
              {selectedSong.item.name}
            </Typography>
          </Pressable>
        )}
        {!isTextModalVisible && (
          <Pressable onPress={onDonePress} style={styles.doneButton}>
            <Typography style={styles.doneText}>Done</Typography>
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
        onDonePress={onDonePress}
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
    position: 'absolute',
    left: HORIZONTAL_MARGIN,
    zIndex: 1,
  },
  topContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  bottomContainer: {
    marginBottom: 40,
  },
  songView: {},
  songImage: {
    width: 30,
    height: 30,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 5,
  },
  songContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  songText: {
    textAlign: 'center',
  },
  doneButton: {
    position: 'absolute',
    right: HORIZONTAL_MARGIN,
    zIndex: 1,
  },
  doneText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
