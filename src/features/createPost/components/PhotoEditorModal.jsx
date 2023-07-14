import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PhotoEditorModal as PhotoEditor} from 'react-native-photoeditorsdk';

const PhotoEditorModal = ({visible, image, onFinish}) => {
  const configuration = {
    filter: {
      // By default, the filters are grouped according to the filter
      // categories passed to the configuration. In this example,
      // the filter grouping is disabled so that all
      // available filters will be displayed separately.
      flattenCategories: true,
    },
  };
  return (
    <PhotoEditor
      configuration={configuration}
      // Add a photo from the assets directory.
      image={image}
      // Determine whether the editor should be visible or not.
      visible={visible}
      onExport={result => {
        // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
        console.log('result.image===>', result.image);
        onFinish();
      }}
      onCancel={() => {
        // The user tapped on the cancel button within the editor.
        onFinish();
      }}
      onError={error => {
        // There was an error generating the photo.
        console.log(error);
        onFinish();
      }}
    />
  );
};

export default PhotoEditorModal;

const styles = StyleSheet.create({});
