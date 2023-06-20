import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utils/constants';

const FILTERS = [
  {name: 'Default', matrix: []},
  {
    name: 'Sepia',
    matrix: [
      0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131,
      0, 0, 0, 0, 0, 1, 0,
    ],
  },
  // Add more filters here
];

const FilterOptions = ({mediaUri, mediaType}) => {
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0].filter);
  const [filteredImage, setFilteredImage] = useState(mediaUri);

  const applyFilter = useCallback(() => {}, []);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => applyFilter(item)}>
      {mediaType === 'image' ? (
        <Image source={{uri: mediaUri}} style={styles.image} />
      ) : (
        <Video
          source={{uri: mediaUri}}
          style={styles.image}
          resizeMode="cover"
          shouldPlay={false} // Set to false to pause the video initially
          isLooping={false}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {mediaType === 'image' ? (
        <Image source={{uri: mediaUri}} style={styles.previewImage} />
      ) : (
        <Video
          source={{uri: mediaUri}}
          style={styles.previewImage}
          resizeMode="cover"
          shouldPlay={true} // Set to false to pause the video initially
          isLooping={true}
        />
      )}

      <View>
        <FlatList
          data={FILTERS}
          horizontal
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
};

export default FilterOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterOption: {
    marginHorizontal: 10,
  },
  activeFilter: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  previewImage: {
    flexGrow: 1,
  },
  separator: {
    width: 10,
  },
  media: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    flex: 1,
  },
});
