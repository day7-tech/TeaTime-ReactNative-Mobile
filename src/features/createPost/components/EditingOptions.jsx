import React from 'react';
import {StyleSheet, View} from 'react-native';
import AIMagicIcon from '../../../../assets/images/AI-magic.png';
import FiltersIcon from '../../../../assets/images/filters.png';
import MusicIcon from '../../../../assets/images/music.png';
import StickerIcon from '../../../../assets/images/sticker.png';
import TextIcon from '../../../../assets/images/text.png';
import TrimIcon from '../../../../assets/images/trim.png';
import FeedOption from '../../../components/FeedOption';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';

/**
 * EditingOptions component that displays various editing options for media.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onMusicPress - Callback function when the music option is pressed.
 * @param {function} props.onFiltersPress - Callback function when the filters option is pressed.
 * @param {function} props.onAIMagicPress - Callback function when the AI magic option is pressed.
 * @param {function} props.onStickerPress - Callback function when the sticker option is pressed.
 * @param {function} props.onTextPress - Callback function when the text option is pressed.
 * @param {string} props.mediaType - The type of media (e.g., 'video', 'image').
 * @param {function} props.onTrimPress - Callback function when the trim option is pressed (only for videos).
 * @returns {JSX.Element} - EditingOptions component.
 */
const EditingOptions = ({
  onMusicPress,
  onFiltersPress,
  onAIMagicPress,
  onStickerPress,
  onTextPress,
  mediaType,
  onTrimPress,
}) => {
  return (
    <View style={styles.container}>
      <FeedOption
        label={'Music'}
        imageIcon={MusicIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onMusicPress}
      />
      <FeedOption
        label={'Filters'}
        imageIcon={FiltersIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onFiltersPress}
      />
      <FeedOption
        label={'Ai Magic'}
        imageIcon={AIMagicIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onAIMagicPress}
      />
      <FeedOption
        label={'Text'}
        imageIcon={TextIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onTextPress}
      />
      <FeedOption
        label={'Sticker'}
        imageIcon={StickerIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onStickerPress}
      />
      {mediaType === 'video' && (
        <FeedOption
          label={'Trim'}
          imageIcon={TrimIcon}
          textStyle={styles.label}
          style={styles.optionContainer}
          onPress={onTrimPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    opacity: 0.6,
    marginHorizontal: HORIZONTAL_MARGIN * 2,
    borderRadius: 40,
    padding: 6,
  },
  label: {
    color: Colors.black,
    marginVertical: 0,
    fontSize: 12,
  },
  optionContainer: {
    marginBottom: 0,
  },
});

export default EditingOptions;
