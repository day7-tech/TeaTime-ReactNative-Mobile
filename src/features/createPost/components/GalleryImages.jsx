import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {Colors} from '../../../utils/styles';

const GalleryImages = ({mediaType}) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const handleSelectPhoto = async () => {
      try {
        let permissionStatus = '';

        // Checking permission status based on the platform
        if (Platform.OS === 'android') {
          permissionStatus = await check(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );
        } else if (Platform.OS === 'ios') {
          permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        }

        if (permissionStatus === RESULTS.GRANTED) {
          // Launching image library if permission is granted
          const media = await ImagePicker.launchImageLibrary({
            mediaType: mediaType,
          });
          if (!media.didCancel && !media.error) {
            // Setting the selected photo in the state
            setPhotos([media.assets[0].uri]);
          }
        } else {
          let permissionType = '';
          if (Platform.OS === 'android') {
            permissionType = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
          } else if (Platform.OS === 'ios') {
            permissionType = PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY;
          }

          // Requesting permission if not granted
          const result = await request(permissionType);
          console.log('result', result);
          if (result === RESULTS.GRANTED) {
            // Launching image library if permission is granted
            const media = await ImagePicker.launchImageLibrary({
              mediaType: mediaType,
            });
            if (!media.didCancel && !media.error) {
              // Setting the selected photo in the state
              setPhotos([media.assets[0].uri]);
            }
          } else {
            console.log('Photo library permission denied');
          }
        }
      } catch (error) {
        console.log('Error requesting permissions:', error);
      }
    };

    handleSelectPhoto();
  }, [mediaType]);

  return (
    <View>
      {photos.length > 0 &&
        photos.map((photo, index) => (
          <Image key={index} source={{uri: photo}} style={[styles.photo]} />
        ))}
    </View>
  );
};

export default GalleryImages;

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 1,
    borderColor: Colors.white,
  },
  photo: {
    width: 40,
    height: 40,
    borderColor: Colors.white,
    borderRadius: 10,
    borderWidth: 2,
  },
});
