import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const VideoEditorModal = ({visible, video, onFinish}) => {
  return (
    <VideoEditorModal
      // Add a video from the assets directory.
      video={video}
      // Determine whether the editor should be visible or not.
      visible={visible}
      onExport={result => {
        // The user exported a new video successfully and the newly generated video is located at `result.video`.
        console.log(result.video);
        onFinish();
      }}
      onCancel={() => {
        // The user tapped on the cancel button within the editor.
        onFinish();
      }}
      onError={error => {
        // There was an error generating the video.
        console.log(error);
        onFinish();
      }}
    />
  );
};

export default VideoEditorModal;

const styles = StyleSheet.create({});
