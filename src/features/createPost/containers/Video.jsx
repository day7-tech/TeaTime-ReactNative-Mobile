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
import RNFS from 'react-native-fs';
import * as ImagePicker from 'react-native-image-picker';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import ChangeCameraIcon from '../../../../assets/images/change-camera.png';
import CloseIcon from '../../../../assets/images/close.png';
import FlashLightIcon from '../../../../assets/images/light.png';
import RecordVideoIcon from '../../../../assets/images/record-video.png';
import {ROUTE_EDITING} from '../../../navigators/RouteNames';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import GalleryImages from '../components/GalleryImages';

const Video = ({onClosePress}) => {
  const navigation = useNavigation();

  const [cameraType, setCameraType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const cameraRef = useRef();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState('not-determined');
  const [isRecording, setIsRecording] = useState(false);
  const isFocused = useIsFocused();

  const devices = useCameraDevices();
  const device = cameraType === 'back' ? devices.back : devices.front;
  console.log(devices);

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

  const toggleFlash = () => {
    setFlashMode(prevFlashMode => (prevFlashMode === 'off' ? 'on' : 'off'));
  };

  const switchCamera = useCallback(async () => {
    setCameraType(prevState => (prevState === 'back' ? 'front' : 'back'));
  }, []);

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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'video',
    });

    if (!result.canceled) {
      // Do something with the selected image or video
      const tempFileUri = await saveFileToLocal(result.assets[0].uri);
      goToPreviewScreen(tempFileUri);
    }
  };

  const goToPreviewScreen = tempFileUri => {
    navigation.navigate(ROUTE_EDITING, {
      fileUri: tempFileUri,
      mediaType: 'video',
    });
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true); // Set the recording state to true
      console.log('start recording');
      try {
        cameraRef.current.startRecording({
          onRecordingFinished: video => goToPreviewScreen(video.path),
          onRecordingError: error => console.error(error),
        });

        // Handle the recorded video data here
      } catch (error) {
        console.log('Error while recording:', error);
      } finally {
        setIsRecording(false); // Set the recording state back to false
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false); // Set the recording state to false
    }
  };

  const handleMediaCapture = fileUri => {
    // Handle the captured video here
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
        torch={flashMode}
        video={true}
        audio={true}>
        <View style={styles.topButtonContainer}>
          <Pressable onPress={onClosePress} style={styles.closeButton}>
            <Image source={CloseIcon} />
          </Pressable>
          <Pressable onPress={toggleFlash} style={styles.flashButton}>
            <Image source={FlashLightIcon} />
          </Pressable>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Pressable onPress={pickImage}>
            <GalleryImages mediaType="video" />
          </Pressable>
          <Pressable
            onPressIn={startRecording}
            onPressOut={stopRecording}
            style={styles.flashButton}>
            <Image
              source={RecordVideoIcon}
              style={isRecording && styles.recordIconSmall}
            />
          </Pressable>
          <Pressable onPress={switchCamera} style={styles.flashButton}>
            <Image source={ChangeCameraIcon} />
          </Pressable>
        </View>
      </Camera>
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  topButtonContainer: {
    padding: HORIZONTAL_MARGIN,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },

  recordIconSmall: {
    width: 30,
    height: 30,
  },
});
