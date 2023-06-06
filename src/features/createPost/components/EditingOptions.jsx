import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FeedOption from "../../../components/FeedOption";
import AIMagicIcon from "../../../../assets/images/AI-magic.png";
import MusicIcon from "../../../../assets/images/music.png";
import FiltersIcon from "../../../../assets/images/filters.png";
import TextIcon from "../../../../assets/images/text.png";
import StickerIcon from "../../../../assets/images/sticker.png";
import TrimIcon from "../../../../assets/images/trim.png";
import { Colors } from "../../../utils/styles";
import { HORIZONTAL_MARGIN } from "../../../utils/constants";

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
        label={"Music"}
        imageIcon={MusicIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onMusicPress}
      />
      <FeedOption
        label={"Filters"}
        imageIcon={FiltersIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onFiltersPress}
      />
      <FeedOption
        label={"Ai Magic"}
        imageIcon={AIMagicIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onAIMagicPress}
      />
      <FeedOption
        label={"Text"}
        imageIcon={TextIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onTextPress}
      />
      <FeedOption
        label={"Sticker"}
        imageIcon={StickerIcon}
        textStyle={styles.label}
        style={styles.optionContainer}
        onPress={onStickerPress}
      />
      {mediaType === "video" && (
        <FeedOption
          label={"Trim"}
          imageIcon={TrimIcon}
          textStyle={styles.label}
          style={styles.optionContainer}
          onPress={onTrimPress}
        />
      )}
    </View>
  );
};

export default EditingOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
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
