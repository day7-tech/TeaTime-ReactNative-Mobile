import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BottomModal from '../../../components/BottomModal';
import Stickers from '../../../utils/Stickers';
import StickerSelectionGrid from '../../../components/StickerSelectionGrid/StickerSelectionGrid';
import CloseIcon from '../../../../assets/images/close.png';
import Typography from '../../../components/Typography/Typography';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {BlurView} from '@react-native-community/blur';

const StickerSelectionModal = ({
  stickerSelectionModalRef,
  onClosePress,
  onStickerSelectDonePress,
}) => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  return (
    <BottomModal
      bottomSheetModalRef={stickerSelectionModalRef}
      snapPoints={['95%']}
      bottomSheetContainerStyle={styles.container}
      containerStyle={styles.bottomContainer}>
      <BlurView blurAmount={40}>
        <View style={styles.headerContainer}>
          <Pressable onPress={onClosePress} style={styles.closeButton}>
            <Image source={CloseIcon} />
          </Pressable>
          <Pressable
            onPress={() => onStickerSelectDonePress(selectedSticker)}
            style={styles.closeButton}>
            <Typography style={styles.doneButton}>Done</Typography>
          </Pressable>
        </View>
        <StickerSelectionGrid
          selectedSticker={selectedSticker}
          setSelectedSticker={setSelectedSticker}
          images={Stickers}
        />
      </BlurView>
    </BottomModal>
  );
};

export default StickerSelectionModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  doneButton: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: HORIZONTAL_MARGIN,
  },
  bottomContainer: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
});
