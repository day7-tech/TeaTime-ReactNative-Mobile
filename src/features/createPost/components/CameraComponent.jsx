import {CameraScreen} from 'react-native-camera-kit';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import ChangeCameraIcon from '../../../../assets/images/change-camera.png';
import CloseIcon from '../../../../assets/images/close.png';
import FlashLightIcon from '../../../../assets/images/light.png';
import PhotoClickIcon from '../../../../assets/images/photo-click.png';
import RecordVideoIcon from '../../../../assets/images/record-video.png';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import GalleryImages from './GalleryImages';
import {launchImageLibrary} from 'react-native-image-picker';

const CameraComponent = ({
  onClosePress,
  mediaType,
  onMediaCapture,
  children,
  cameraRef,
  isCameraEnabled,
  setIsCameraEnabled,
}) => {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [micPermission, requestMicPermission] =
    Camera.useMicrophonePermissions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!cameraPermission?.granted || !micPermission?.granted) {
        if (!cameraPermission?.granted) await requestCameraPermission();
        if (!micPermission?.granted) await requestMicPermission();
      }

      setIsCameraEnabled(true);
      setIsLoading(false);
    };

    fetchData();
  }, [
    cameraPermission?.granted,
    micPermission?.granted,
    requestCameraPermission,
    requestMicPermission,
    setIsCameraEnabled,
  ]);

  const onCameraReady = () => {
    setIsCameraEnabled(true);
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaTypes: mediaType ? [mediaType] : 'mixed',
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const tempFileUri = await saveFileToLocal(result.assets[0].uri);
      onMediaCapture(tempFileUri);
    }
  };

  const toggleFlash = () => {
    setFlashMode(prevFlashMode =>
      prevFlashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off,
    );
  };

  const switchCamera = () => {
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const tempFileUri = await saveFileToLocal(data.uri);
      onMediaCapture(tempFileUri);
    }
  };

  const startRecording = async () => {
    if (cameraRef.current && isCameraEnabled) {
      const options = {
        quality: Camera.Constants.VideoQuality['720p'],
        maxDuration: 60,
      };
      const data = await cameraRef.current.recordAsync(options);
      // Handle the recorded video data here
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isCameraEnabled) {
      cameraRef.current.stopRecording();
    }
  };

  if (isLoading || !cameraPermission || !micPermission) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={styles.container}>
      {isCameraEnabled && (
        <Camera
          style={Platform.OS === 'android' ? {aspectRatio: 9 / 16} : {flex: 1}}
          type={cameraType}
          flashMode={flashMode}
          ref={cameraRef}
          ratio={'16:9'}
          onCameraReady={onCameraReady}>
          <View style={styles.topButtonContainer}>
            <Pressable onPress={onClosePress} style={styles.closeButton}>
              <Image source={CloseIcon} />
            </Pressable>
          </View>
          <View style={styles.bottomButtonContainer}>
            {mediaType && (
              <Pressable onPress={pickImage}>
                <GalleryImages />
              </Pressable>
            )}
            <Pressable onPress={toggleFlash} style={styles.flashButton}>
              <Image source={FlashLightIcon} />
            </Pressable>
            {mediaType === 'video' && (
              <Pressable
                onPressIn={startRecording}
                onPressOut={stopRecording}
                style={styles.flashButton}>
                <Image source={RecordVideoIcon} />
              </Pressable>
            )}
            <Pressable onPress={takePicture} style={styles.flashButton}>
              <Image source={PhotoClickIcon} />
            </Pressable>
            <Pressable onPress={switchCamera} style={styles.flashButton}>
              <Image source={ChangeCameraIcon} />
            </Pressable>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default CameraComponent;

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
