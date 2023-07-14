import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ChangeCameraIcon from '../../../../assets/images/change-camera.png';
import CloseIcon from '../../../../assets/images/close.png';
import FaceMasksIcon from '../../../../assets/images/face-masks.png';
import FlashLightIcon from '../../../../assets/images/light.png';
import PhotoClickIcon from '../../../../assets/images/photo-click.png';
import {
  ROUTE_EDITING,
  ROUTE_GRADIENT_TEXT_POST,
} from '../../../navigators/RouteNames';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import GalleryImages from '../components/GalleryImages';
import RNFS from 'react-native-fs';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {PESDK} from 'react-native-photoeditorsdk';
import PhotoEditorModal from '../components/PhotoEditorModal';

const Post = ({onClosePress}) => {
  const navigation = useNavigation();

  const [cameraType, setCameraType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const cameraRef = useRef();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState('not-determined');
  const [selectedImage, setSelectedImage] = useState(null); // Added state for selected image
  const [isPhotoEditorVisible, setIsPhotoEditorVisible] = useState(false);
  const isFocused = useIsFocused();

  const devices = useCameraDevices();
  const device = cameraType === 'back' ? devices.back : devices.front;

  const requestMicrophonePermission = useCallback(async () => {
    console.log('Requesting microphone permission...');
    const permission = await Camera.requestMicrophonePermission();
    console.log(`Microphone permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setMicrophonePermissionStatus(permission);
  }, [setMicrophonePermissionStatus]);

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, [setCameraPermissionStatus]);

  const saveFileToLocal = useCallback(async uri => {
    const fileName = uri.split('/').pop();
    const fileExtension = fileName.split('.').pop();
    const tempFileUri = `${
      RNFS.DocumentDirectoryPath
    }/${Date.now()}.${fileExtension}`;

    try {
      await RNFS.copyFile(uri, tempFileUri);

      console.log('File saved temporarily at:', tempFileUri);
      return tempFileUri;
    } catch (error) {
      console.error('Error saving file:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Enable the camera when the screen is focused
      if (
        cameraPermissionStatus !== 'authorized' ||
        microphonePermissionStatus !== 'authorized'
      ) {
        // Camera or mic permissions are not granted yet
        if (cameraPermissionStatus !== 'authorized') {
          await requestCameraPermission();
        }
        if (microphonePermissionStatus !== 'authorized') {
          await requestMicrophonePermission();
        }
      }
    };

    fetchData();
  }, [
    cameraPermissionStatus,
    microphonePermissionStatus,
    requestCameraPermission,
    requestMicrophonePermission,
  ]);

  const pickImage = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaTypes: 'photo',
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // Do something with the selected image or video
      const tempFileUri = await saveFileToLocal(result.assets[0].uri);
      setSelectedImage(tempFileUri); // Set the selected image URI to the state
      setIsPhotoEditorVisible(true); // Show the PhotoEditorModal
      // Create a `Configuration` object.
    }
  }, [saveFileToLocal]);

  const toggleFlash = () => {
    setFlashMode(prevFlashMode => (prevFlashMode === 'off' ? 'on' : 'off'));
  };

  const switchCamera = useCallback(async () => {
    setCameraType(prevState => (prevState === 'back' ? 'front' : 'back'));
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePhoto(options);
      const tempFileUri = await saveFileToLocal(data.path);
      navigation.navigate(ROUTE_EDITING, {
        fileUri: tempFileUri,
        mediaType: 'image',
      });
      setSelectedImage(tempFileUri); // Set the selected image URI to the state
      setIsPhotoEditorVisible(true);
    }
  };

  const closePhotoEditor = useCallback(() => {
    setIsPhotoEditorVisible(false); // Close the PhotoEditorModal
  }, []);

  const handleMediaCapture = fileUri => {
    // Handle the captured image here
  };

  if (
    cameraPermissionStatus !== 'authorized' ||
    microphonePermissionStatus !== 'authorized'
  ) {
    // Camera permissions are still loading
    return <ActivityIndicator size="large" color="#fff" />;
  }

  const gradientTestPost = () => {
    navigation.navigate(ROUTE_GRADIENT_TEXT_POST);
  };

  if (device == null) return <ActivityIndicator size="large" color="#fff" />;
  return (
    <View style={styles.container}>
      <Camera
        style={Platform.OS === 'android' ? {aspectRatio: 9 / 16} : {flex: 1}}
        device={device}
        isActive={isFocused}
        ref={cameraRef}
        photo={true}
        torch={flashMode}>
        <View style={styles.topButtonContainer}>
          <Pressable onPress={onClosePress} style={styles.closeButton}>
            <Image source={CloseIcon} />
          </Pressable>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Pressable onPress={pickImage}>
            <GalleryImages mediaType="photo" />
          </Pressable>
          <Pressable onPress={toggleFlash} style={styles.flashButton}>
            <Image source={FlashLightIcon} />
          </Pressable>
          <Pressable onPress={takePicture} style={styles.flashButton}>
            <Image source={PhotoClickIcon} />
          </Pressable>
          <Pressable onPress={switchCamera} style={styles.flashButton}>
            <Image source={ChangeCameraIcon} />
          </Pressable>
          <Pressable onPress={gradientTestPost} style={styles.flashButton}>
            <Image source={FaceMasksIcon} />
          </Pressable>
        </View>
      </Camera>
      <PhotoEditorModal
        visible={isPhotoEditorVisible}
        image={selectedImage}
        onFinish={closePhotoEditor}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  topButtonContainer: {
    flex: 1,
    padding: HORIZONTAL_MARGIN,
  },
});
