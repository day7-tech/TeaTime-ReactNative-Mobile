import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Typography from './Typography/Typography';
import {Colors} from '../utils/styles';

/**
 * Component that displays channel and uploader details.
 * @param {string} channelImage - The URI of the channel image.
 * @param {string} channelName - The name of the channel.
 * @param {string} uploaderImage - The URI of the uploader image.
 * @param {string} uploaderName - The name of the uploader.
 * @returns {JSX.Element} - The ChannelAndUploaderDetails component.
 */
const ChannelAndUploaderDetails = ({
  channelImage,
  channelName,
  uploaderImage,
  uploaderName,
  onPress,
}) => {
  return (
    <Pressable style={styles.channelDetailsContainer} onPress={onPress}>
      <View style={styles.userDetails}>
        <Image source={{uri: uploaderImage}} style={styles.uploaderImage} />
        <Image source={{uri: channelImage}} style={styles.channelImage} />
      </View>
      <View style={styles.textContainer}>
        <Typography style={styles.uploaderName} numberOfLines={1}>
          {uploaderName}
        </Typography>
        <Typography style={styles.channelName} numberOfLines={1}>
          {channelName}
        </Typography>
      </View>
    </Pressable>
  );
};

export default ChannelAndUploaderDetails;

const styles = StyleSheet.create({
  channelImage: {
    width: 26,
    height: 26,
    borderRadius: 26,
    position: 'absolute',
    bottom: -2,
    right: 5,
  },
  uploaderName: {
    fontWeight: 'bold',
    color: Colors.white,
    paddingBottom: 5,
  },
  channelDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploaderImage: {
    marginRight: 15,
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  channelName: {
    color: Colors.white,
    lineHeight: 14,
  },
  textContainer: {
    flex: 1,
  },
});
