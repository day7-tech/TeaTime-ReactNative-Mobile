import React, {useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import BottomPanel from '../../BottomPanel/BottomPanel';
import StickerSelectionGrid from '../StickerSelectionGrid';
import GradientBtn from '../../Buttons/GradientBtn';
import styles from './StickerSelectionPanel.style';

export default function StickerSelectionPanel({
  isRecognitionPanelVisible,
  setIsRecognitionPanelVisible,
  selectedPost,
  stickerSet,
  sendSticker,
  children,
  sendButtonText = 'Send',
}) {
  const [selectedSticker, setSelectedSticker] = useState(null);

  if (!selectedPost) return null;

  function send() {
    // Show error toast if no sticker is selected
    if (!selectedSticker) {
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
    setIsRecognitionPanelVisible(false);

    sendSticker(selectedSticker);
  }

  return (
    <BottomPanel
      isPanelVisible={isRecognitionPanelVisible}
      setIsPanelVisible={setIsRecognitionPanelVisible}>
      <View style={styles.container}>
        {children}
        <StickerSelectionGrid
          selectedSticker={selectedSticker}
          setSelectedSticker={setSelectedSticker}
          images={stickerSet}
        />
        <GradientBtn
          btnInfo={sendButtonText}
          btnTextColor="white"
          onPress={send}
        />
      </View>
    </BottomPanel>
  );
}
