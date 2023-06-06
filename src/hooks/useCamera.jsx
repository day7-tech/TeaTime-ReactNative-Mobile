// import {Camera} from 'expo-camera';
// import {useCallback, useEffect, useRef, useState} from 'react';

// export const useCamera = () => {
//   const [isCameraEnabled, setIsCameraEnabled] = useState(false);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
//   const cameraRef = useRef();
//   const [cameraPermission, requestCameraPermission] =
//     Camera.useCameraPermissions();
//   const [micPermission, requestMicPermission] =
//     Camera.useMicrophonePermissions();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!cameraPermission?.granted || !micPermission?.granted) {
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

//   return {
//     isCameraEnabled,
//     cameraType,
//     flashMode,
//     cameraRef,
//     toggleFlash,
//     switchCamera,
//     onCameraReady,
//     isLoading,
//   };
// };
