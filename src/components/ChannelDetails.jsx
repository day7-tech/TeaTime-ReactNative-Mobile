import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Typography from './Typography/Typography';
import {Colors} from '../utils/styles';

/**
 * Component that displays channel details.
 * @param {Function} onPress - The function to be called when the channel details are pressed.
 * @param {string} channelImage - The URI of the channel image.
 * @param {string} channelName - The name of the channel.
 * @returns {JSX.Element} - The ChannelDetails component.
 */
const ChannelDetails = ({onPress, channelImage, channelName, textStyle}) => {
  return (
    <Pressable style={styles.channelDetailsContainer} onPress={onPress}>
      <Image source={{uri: channelImage}} style={styles.channelImage} />
      <Typography style={[styles.channelName, textStyle]}>
        {channelName}
      </Typography>
    </Pressable>
  );
};

export default ChannelDetails;

const styles = StyleSheet.create({
  channelDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelImage: {
    marginRight: 15,
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  channelName: {
    fontWeight: 'bold',
    color: Colors.white,
  },
});
