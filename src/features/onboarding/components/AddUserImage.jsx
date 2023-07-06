import React, {useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import AddImageIcon from '../../../../assets/images/floating_button.png';
import {Colors} from '../../../utils/styles';

const AddUserImage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);

    if (cameraPermission !== RESULTS.GRANTED) {
      // Handle camera permission denial
    }
  };

  const requestLibraryPermission = async () => {
    const libraryPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

    if (libraryPermission !== RESULTS.GRANTED) {
      // Handle library permission denial
    }
  };

  const handleImageSelect = () => {
    setModalVisible(false);
    requestLibraryPermission().then(() => {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
      };

      launchImageLibrary(options, response => {
        if (!response.didCancel && !response.error) {
          setImageUri(response.assets[0]?.uri);
        }
      });
    });
  };

  const handleCameraCapture = () => {
    setModalVisible(false);
    requestCameraPermission().then(() => {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
      };

      launchCamera(options, response => {
        if (!response.didCancel && !response.error) {
          setImageUri(response.assets[0]?.uri);
        }
      });
    });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      {imageUri ? (
        <Pressable onPress={() => setModalVisible(true)}>
          <Image source={{uri: imageUri}} style={styles.placeholderImage} />
        </Pressable>
      ) : (
        <Pressable
          style={styles.placeholderImage}
          onPress={() => setModalVisible(true)}>
          <Image source={AddImageIcon} style={styles.floatingButton} />
        </Pressable>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable style={styles.modalOption} onPress={handleImageSelect}>
              <Text style={styles.modalOptionText}>Choose from Library</Text>
            </Pressable>
            <Pressable style={styles.modalOption} onPress={handleCameraCapture}>
              <Text style={styles.modalOptionText}>Capture with Camera</Text>
            </Pressable>
            <Pressable style={styles.modalOption} onPress={handleModalCancel}>
              <Text style={[styles.modalOptionText, styles.cancelText]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddUserImage;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  placeholderImage: {
    backgroundColor: Colors.primariesShade03,
    height: 110,
    width: 110,
    borderRadius: 55,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 32,
    width: 32,
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingBottom: 24,
  },
  modalOptionText: {
    fontSize: 18,
    color: Colors.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cancelText: {
    color: Colors.lightGrey,
  },
});
