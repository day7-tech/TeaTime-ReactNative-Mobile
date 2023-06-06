import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import CloseIcon from '../../../../assets/images/close.png';
import BottomModal from '../../../components/BottomModal';
import SongCard from '../../../components/Cards/SongCard';
import Typography from '../../../components/Typography/Typography';
import {generateRandomMusic} from '../../../services/generateRandomContent';
import Sound from 'react-native-sound';

const SongSelectionModal = ({
  songSelectionModalRef,
  onClosePress,
  onSongSelectDonePress,
}) => {
  const [songs] = useState(generateRandomMusic());
  const [playingSongId, setPlayingSongId] = useState('');
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const soundObject = useRef(new Sound()).current;

  useEffect(() => {
    return () => {
      // Stop the song playback when the modal is closed
      stopAudioPlayback();
    };
  }, [stopAudioPlayback]);

  const stopAudioPlayback = useCallback(async () => {
    try {
      if (playingSongId) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
        setPlayingSongId('');
      }
    } catch (error) {
      // Discard error
    }
  }, [playingSongId, soundObject]);

  const setIsSelected = useCallback(
    song => {
      if (selectedSongId === song.item.id) {
        setSelectedSongId(null); // Deselect the song if already selected
        setSelectedSong(null);
      } else {
        setSelectedSongId(song.item.id); // Select the song if not selected
        setSelectedSong(song);
      }
    },
    [selectedSongId],
  );

  return (
    <BottomModal
      bottomSheetModalRef={songSelectionModalRef}
      containerStyle={{flex: 1}}
      snapPoints={['100%']}>
      <View>
        <View style={styles.headerContainer}>
          <Pressable onPress={onClosePress}>
            <Image source={CloseIcon} />
          </Pressable>
          <Pressable onPress={() => onSongSelectDonePress(selectedSong)}>
            <Typography style={styles.doneButton}>Done</Typography>
          </Pressable>
        </View>
        <Typography style={styles.text}>Choose a song for the post</Typography>
        <FlatList
          data={songs}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={song => (
            <SongCard
              isPlaying={playingSongId === song.item.id}
              setIsPlaying={b => {
                if (b) {
                  setPlayingSongId(song.item.id);
                } else {
                  setPlayingSongId('');
                }
              }}
              uri={song.item.uri}
              name={song.item.name}
              details={song.item.details}
              isSelected={selectedSongId === song.item.id}
              setIsSelected={() => setIsSelected(song)}
            />
          )}
          keyExtractor={song => song.id}
        />
      </View>
    </BottomModal>
  );
};

export default SongSelectionModal;

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 55,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  list: {
    height: '100%',
  },
  listContent: {
    paddingBottom: 100,
  },
  headerContainer: {
    marginTop: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doneButton: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
