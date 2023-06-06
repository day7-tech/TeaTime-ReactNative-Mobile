// import {useNavigation} from '@react-navigation/native';
// import {Camera} from 'expo-camera';
// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import ChangeCameraIcon from '../../../../assets/images/change-camera.png';
// import CloseIcon from '../../../../assets/images/close.png';
// import FlashLightIcon from '../../../../assets/images/light.png';
// import RecordVideoIcon from '../../../../assets/images/record-video.png';
// import {ROUTE_EDITING} from '../../../navigators/RouteNames';
// import {HORIZONTAL_MARGIN} from '../../../utils/constants';
// import {Colors} from '../../../utils/styles';
// import GalleryImages from '../components/GalleryImages';

// const Video = ({onClosePress}) => {
//   const navigation = useNavigation();
//   const [isCameraEnabled, setIsCameraEnabled] = useState(false);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
//   const cameraRef = useRef();
//   const [cameraPermission, requestCameraPermission] =
//     Camera.useCameraPermissions();
//   const [micPermission, requestMicPermission] =
//     Camera.useMicrophonePermissions();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isRecording, setIsRecording] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       // Enable the camera when the screen is focused
//       if (!cameraPermission?.granted || !micPermission?.granted) {
//         // Camera or mic permissions are not granted yet
//         if (!cameraPermission?.granted) await requestCameraPermission();
//         if (!micPermission?.granted) await requestMicPermission();
//       }

//       setIsCameraEnabled(true);
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [
//     cameraPermission?.granted,
//     micPermission?.granted,
//     requestCameraPermission,
//     requestMicPermission,
//   ]);

//   const toggleFlash = () => {
//     setFlashMode(prevFlashMode =>
//       prevFlashMode === Camera.Constants.FlashMode.off
//         ? Camera.Constants.FlashMode.torch
//         : Camera.Constants.FlashMode.off,
//     );
//   };
//   const switchCamera = () => {
//     setCameraType(prevCameraType =>
//       prevCameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back,
//     );
//   };
//   const onCameraReady = useCallback(() => {
//     setIsCameraEnabled(true);
//   }, []);

//   const pickImage = async () => {
//     const result = await launchImageLibrary({
//       mediaTypes: 'video',
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       // Do something with the selected image or video
//       const tempFileUri = await saveFileToLocal(result.assets[0].uri);
//       goToPreviewScreen(tempFileUri);
//     }
//   };

//   const goToPreviewScreen = tempFileUri => {
//     navigation.navigate(ROUTE_EDITING, {
//       fileUri: tempFileUri,
//       mediaType: 'video',
//     });
//   };

//   const startRecording = async () => {
//     if (cameraRef.current && isCameraEnabled) {
//       const options = {
//         quality: Camera.Constants.VideoQuality['720p'],
//         maxDuration: 60,
//       };

//       setIsRecording(true); // Set the recording state to true

//       try {
//         const data = await cameraRef.current.recordAsync(options);
//         // Handle the recorded video data here
//         const {uri} = data; // Get the file URI from the recorded video data
//         goToPreviewScreen(uri); // Navigate to the preview screen with the file URI
//       } catch (error) {
//         console.log('Error while recording:', error);
//       } finally {
//         setIsRecording(false); // Set the recording state back to false
//       }
//     }
//   };

//   const stopRecording = () => {
//     if (cameraRef.current && isCameraEnabled) {
//       cameraRef.current.stopRecording();
//       setIsRecording(false); // Set the recording state to false
//     }
//   };

//   const handleMediaCapture = fileUri => {
//     // Handle the captured video here
//   };

//   return (
//     <View style={styles.container}>
//       {isCameraEnabled && (
//         <Camera
//           style={Platform.OS === 'android' ? {aspectRatio: 9 / 16} : {flex: 1}}
//           type={cameraType}
//           flashMode={flashMode}
//           ref={cameraRef}
//           ratio={'16:9'}
//           onCameraReady={onCameraReady}>
//           <View style={styles.topButtonContainer}>
//             <Pressable onPress={onClosePress} style={styles.closeButton}>
//               <Image source={CloseIcon} />
//             </Pressable>
//             <Pressable onPress={toggleFlash} style={styles.flashButton}>
//               <Image source={FlashLightIcon} />
//             </Pressable>
//           </View>
//           <View style={styles.bottomButtonContainer}>
//             <Pressable onPress={pickImage}>
//               <GalleryImages mediaType="video" />
//             </Pressable>
//             <Pressable
//               onPressIn={startRecording}
//               onPressOut={stopRecording}
//               style={styles.flashButton}>
//               <Image
//                 source={RecordVideoIcon}
//                 style={isRecording && styles.recordIconSmall}
//               />
//             </Pressable>
//             <Pressable onPress={switchCamera} style={styles.flashButton}>
//               <Image source={ChangeCameraIcon} />
//             </Pressable>
//           </View>
//         </Camera>
//       )}
//     </View>
//   );
// };

// export default Video;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.black,
//     flex: 1,
//   },
//   topButtonContainer: {
//     padding: HORIZONTAL_MARGIN,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   bottomButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     marginBottom: 10,
//   },

//   recordIconSmall: {
//     width: 30,
//     height: 30,
//   },
// });
