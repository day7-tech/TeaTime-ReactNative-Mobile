import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../utils/constants';
import {
  AdenCompat,
  _1977Compat,
  BrannanCompat,
  BrooklynCompat,
  ClarendonCompat,
  EarlybirdCompat,
  GinghamCompat,
  HudsonCompat,
  InkwellCompat,
  KelvinCompat,
  LarkCompat,
  LofiCompat,
  MavenCompat,
  MayfairCompat,
  MoonCompat,
  NashvilleCompat,
  PerpetuaCompat,
  ReyesCompat,
  RiseCompat,
  SlumberCompat,
  StinsonCompat,
  ToasterCompat,
  ValenciaCompat,
  WaldenCompat,
  WillowCompat,
  Xpro2Compat,
} from 'react-native-image-filter-kit';
import Typography from '../../../components/Typography/Typography';
import {Colors} from '../../../utils/styles';
import {createThumbnail} from 'react-native-create-thumbnail';

const FILTERS = [
  {
    title: 'Normal',
    filterComponent: AdenCompat,
  },
  {
    title: 'Maven',
    filterComponent: MavenCompat,
  },
  {
    title: 'Mayfair',
    filterComponent: MayfairCompat,
  },
  {
    title: 'Moon',
    filterComponent: MoonCompat,
  },
  {
    title: 'Nashville',
    filterComponent: NashvilleCompat,
  },
  {
    title: 'Perpetua',
    filterComponent: PerpetuaCompat,
  },
  {
    title: 'Reyes',
    filterComponent: ReyesCompat,
  },
  {
    title: 'Rise',
    filterComponent: RiseCompat,
  },
  {
    title: 'Slumber',
    filterComponent: SlumberCompat,
  },
  {
    title: 'Stinson',
    filterComponent: StinsonCompat,
  },
  {
    title: 'Brooklyn',
    filterComponent: BrooklynCompat,
  },
  {
    title: 'Earlybird',
    filterComponent: EarlybirdCompat,
  },
  {
    title: 'Clarendon',
    filterComponent: ClarendonCompat,
  },
  {
    title: 'Gingham',
    filterComponent: GinghamCompat,
  },
  {
    title: 'Hudson',
    filterComponent: HudsonCompat,
  },
  {
    title: 'Inkwell',
    filterComponent: InkwellCompat,
  },
  {
    title: 'Kelvin',
    filterComponent: KelvinCompat,
  },
  {
    title: 'Lark',
    filterComponent: LarkCompat,
  },
  {
    title: 'Lofi',
    filterComponent: LofiCompat,
  },
  {
    title: 'Toaster',
    filterComponent: ToasterCompat,
  },
  {
    title: 'Valencia',
    filterComponent: ValenciaCompat,
  },
  {
    title: 'Walden',
    filterComponent: WaldenCompat,
  },
  {
    title: 'Willow',
    filterComponent: WillowCompat,
  },
  {
    title: 'Xpro2',
    filterComponent: Xpro2Compat,
  },
  {
    title: 'Aden',
    filterComponent: AdenCompat,
  },
  {
    title: '_1977',
    filterComponent: _1977Compat,
  },
  {
    title: 'Brannan',
    filterComponent: BrannanCompat,
  },
];

const FilterOptions = ({mediaUri, mediaType}) => {
  const [selectedFilterIndex, setIndex] = useState(0);
  const [thumbnail, setThumbnail] = useState();
  const extractedUri = useRef(
    'https://www.hyundai.com/content/hyundai/ww/data/news/data/2021/0000016609/image/newsroom-0112-photo-1-2021elantranline-1120x745.jpg',
  );

  const onExtractImage = ({nativeEvent}) => {
    extractedUri.current = nativeEvent.uri;
  };

  const onSelectFilter = selectedIndex => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    mediaType !== 'image' &&
      createThumbnail({
        url: mediaUri,
        timeStamp: 0,
      })
        .then(response => setThumbnail(response.path))
        .catch(err => console.log({err}));
  }, [mediaType, mediaUri]);

  const applyFilter = useCallback(() => {}, []);

  const renderItem = ({item, index}) => {
    const FilterComponent = item.filterComponent;
    return (
      <TouchableOpacity
        onPress={() => onSelectFilter(index)}
        style={styles.filterOptionContainer}>
        {mediaType === 'image' ? (
          <FilterComponent
            image={<Image source={{uri: mediaUri}} style={styles.image} />}
          />
        ) : (
          <FilterComponent
            image={<Image source={{uri: thumbnail}} style={styles.image} />}
          />
        )}
        <Typography style={styles.filterText}>{item.title}</Typography>
      </TouchableOpacity>
    );
  };
  const SelectedFilterComponent = FILTERS[selectedFilterIndex].filterComponent;
  return (
    <View style={styles.container}>
      {selectedFilterIndex === 0 ? (
        mediaType === 'image' ? (
          <Image source={{uri: mediaUri}} style={styles.previewImage} />
        ) : (
          <Video
            source={{uri: mediaUri}}
            style={styles.previewImage}
            resizeMode="cover"
            isMuted={false}
            volume={0.9}
            repeat={true}
          />
        )
      ) : mediaType === 'image' ? (
        <SelectedFilterComponent
          onExtractImage={onExtractImage}
          extractImageEnabled={true}
          style={styles.previewImage}
          image={<Image source={{uri: mediaUri}} style={{flex: 1}} />}
        />
      ) : (
        <SelectedFilterComponent
          onExtractImage={onExtractImage}
          extractImageEnabled={true}
          style={styles.previewImage}
          image={
            <Video
              source={{uri: mediaUri}}
              style={{flex: 1}}
              resizeMode="cover"
              isMuted={false}
              volume={0.9}
              repeat={true}
            />
          }
        />
      )}

      <View style={styles.filterContainer}>
        <FlatList
          data={FILTERS}
          horizontal
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item.title}
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
    width: 100,
    height: 100,
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
  filterText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  filterContainer: {
    paddingVertical: 15,
  },
});
