import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Sticker({imageKey, setIsSelected, image}) {
  return (
    <TouchableOpacity
      key={imageKey}
      style={styles.imageContainer}
      onPress={setIsSelected}>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
}

function ImageSelectionAutoRenderer({
  image,
  imageKey,
  isSelected,
  setIsSelected,
}) {
  const stickerComponent = (
    <Sticker imageKey={imageKey} setIsSelected={setIsSelected} image={image} />
  );
  return (
    <View style={styles.backgroundContainer}>
      {isSelected ? (
        <LinearGradient
          colors={['#5A189A', '#E42982', '#FF3D00']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.linearGradient}>
          {stickerComponent}
        </LinearGradient>
      ) : (
        stickerComponent
      )}
    </View>
  );
}

export default function StickerSelectionGrid({
  images,
  selectedSticker,
  setSelectedSticker,
}) {
  return (
    <View style={styles.grid}>
      {Object.keys(images).map(key => (
        <ImageSelectionAutoRenderer
          image={images[key]}
          key={key}
          imageKey={key}
          isSelected={selectedSticker === key}
          setIsSelected={() => setSelectedSticker(key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    padding: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  linearGradient: {
    width: '100%',
    flex: 1,
  },
  backgroundContainer: {
    width: '33.33%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
