import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Toast from 'react-native-toast-message';
import BottomModal from '../../../components/BottomModal';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import StickerSelectionGrid from '../../../components/StickerSelectionGrid/StickerSelectionGrid';
import Typography from '../../../components/Typography/Typography';
import UserCard from '../../../components/UserCard/UserCard';

const RecognitionStickersModal = ({
  recognitionModalRef,
  postDetails,
  stickers,
  onSendStickerPress,
  onModalClose,
}) => {
  const [selectedSticker, setSelectedSticker] = useState(null);

  // Function to handle the send button press
  const send = useCallback(() => {
    if (!selectedSticker) {
      // Display an error toast if no sticker is selected
      return Toast.show({
        type: 'error',
        text1: 'Please select a sticker to continue!',
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    onSendStickerPress(selectedSticker);
  }, [onSendStickerPress, selectedSticker]);

  return (
    <BottomModal
      bottomSheetModalRef={recognitionModalRef}
      containerStyle={{flex: 1, paddingBottom: getBottomSpace()}}>
      <Typography style={styles.headingText}>
        Recognise the efforts by
      </Typography>
      <UserCard
        name={postDetails.uploader.name}
        image={postDetails.uploader.image}
      />
      <Typography style={[styles.headingText, styles.titleText]}>
        Send a thank you sticker
      </Typography>
      <ScrollView style={{width: '100%', marginBottom: 5}}>
        <StickerSelectionGrid
          selectedSticker={selectedSticker}
          setSelectedSticker={setSelectedSticker}
          images={stickers}
        />
      </ScrollView>
      <View>
        <GradientBtn btnInfo={'Send'} btnTextColor="white" onPress={send} />
      </View>
    </BottomModal>
  );
};

export default RecognitionStickersModal;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  titleText: {
    marginVertical: 20,
  },
});
