import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CheckIcon from '../../../assets/images/check.png';
import PauseIcon from '../../../assets/images/pause.png';
import PlayIcon from '../../../assets/images/play.png';
import SongBackgroundImage from '../../../assets/images/song-background.png';
import Typography from '../Typography/Typography';
import Sound from 'react-native-sound';

function PlayOrPause({isPlaying, size}) {
  return (
    <Image
      source={!isPlaying ? PlayIcon : PauseIcon}
      style={{width: size, height: size}}
    />
  );
}

export default function SongCard({
  uri,
  name,
  details,
  isPlaying,
  setIsPlaying,
  isSelected,
  setIsSelected,
}) {
  const sound = useMemo(
    () =>
      new Sound(uri, '', error => {
        if (error) {
          console.log('Failed to load sound', error);
        }
      }),
    [uri],
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  useEffect(() => {
    let isUnmounted = false;

    const loadAudio = async () => {
      try {
        sound.release();
        setIsLoaded(true);
      } catch (error) {
        // Handle error
      }
    };

    if (!isLoaded) {
      loadAudio();
    }

    return () => {
      isUnmounted = true;
      sound.release();
    };
  }, [isLoaded, sound]);

  const togglePlayback = async () => {
    try {
      if (isLoaded) {
        if (isPlaying) {
          sound.pause(); // Pause the sound
        } else {
          if (sound.isPlaying()) {
            sound.stop(); // Stop the currently playing sound
          }
          sound.play(success => {
            if (success) {
              console.log('Successfully finished playing');
            } else {
              console.log('Playback failed due to audio decoding errors');
            }
          });
        }
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <View style={[isSelected && styles.selectedContainer, styles.container]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={togglePlayback}
        style={styles.playPauseContainer}>
        <Image source={SongBackgroundImage} style={styles.image} />
        <View style={styles.iconContainer}>
          <PlayOrPause size={30} isPlaying={isPlaying} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setIsSelected(true)}
        style={styles.textContainer}>
        <Typography style={styles.mainText}>{name}</Typography>
        <Typography style={styles.subText}>{details}</Typography>
      </TouchableOpacity>
      <Image source={CheckIcon} style={styles.check} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  selectedContainer: {
    backgroundColor: '#F725856E',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  mainText: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
    color: 'white',
    lineHeight: 20,
  },
  subText: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
    color: 'white',
    lineHeight: 20,
  },
  image: {
    position: 'absolute',
  },
  playPauseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 60,
    width: 60,
  },
});
