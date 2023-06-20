import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CloseIcon from '../../../../assets/images/close.png';
import BottomModal from '../../../components/BottomModal';
import {HORIZONTAL_MARGIN, SCREEN_WIDTH} from '../../../utils/constants';
import FilterOptions from './FilterOptions';

const FiltersModal = ({
  filtersModalRef,
  fileUri,
  onCloseModalPress,
  mediaType,
  onDonePress,
}) => {
  return (
    <BottomModal
      bottomSheetModalRef={filtersModalRef}
      containerStyle={{flex: 1, paddingHorizontal: 0}}
      snapPoints={['100%']}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={onCloseModalPress}>
          <Image source={CloseIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => onDonePress()}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <FilterOptions mediaUri={fileUri} mediaType={mediaType} />
      </View>
    </BottomModal>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_MARGIN,
    position: 'absolute',
    zIndex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'space-between',
  },
  doneButton: {
    top: 60,
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backIcon: {
    top: 60,
  },
});
