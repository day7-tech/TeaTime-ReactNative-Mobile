import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../utils/styles';
import Typography from './Typography/Typography';

/**
 * Component that displays the caption for a feed.
 * @param {string} caption - The caption to be displayed.
 * @returns {JSX.Element} - The FeedCaption component.
 */
const FeedCaption = ({caption}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [captionLines, setCaptionLines] = useState(0);

  /**
   * Handles the press event on the caption.
   * Toggles the isExpanded state.
   */
  const handleCaptionPress = () => {
    setIsExpanded(prev => !prev);
  };

  /**
   * Callback function to get the number of lines rendered for the caption text.
   * @param {Object} event - The event object containing the native event details.
   */
  const handleTextLayout = event => {
    const {lines} = event.nativeEvent;
    setCaptionLines(lines.length);
  };

  return (
    <TouchableOpacity
      onPress={handleCaptionPress}
      activeOpacity={0.8}
      style={styles.captionContainer}>
      <Typography
        style={styles.caption}
        numberOfLines={isExpanded ? undefined : 2}
        onTextLayout={handleTextLayout}>
        {caption}
      </Typography>
      {captionLines > 2 && !isExpanded && (
        <Typography style={styles.moreOption}>More</Typography>
      )}
    </TouchableOpacity>
  );
};

export default FeedCaption;

const styles = StyleSheet.create({
  caption: {
    color: Colors.white,
  },
  moreOption: {
    color: Colors.white,
    fontWeight: 'bold',
    marginTop: 4,
  },
  captionContainer: {
    marginVertical: 15,
    marginRight: 20,
  },
});
