import React from 'react';
import {Image, View} from 'react-native';

/**
 * Component representing a tab bar option.
 * @param {object} imageIcon - The image icon for the tab bar option.
 * @param {string} color - The color to apply to the image icon.
 * @param {object} style - Additional styles to apply to the image icon.
 * @param {number} height - The height of the tab bar option.
 * @returns {JSX.Element} - The TabBarOption component.
 */
const TabBarOption = ({imageIcon, color, style, height}) => {
  const tabHeight = height;

  return (
    <View style={{height: tabHeight}}>
      <Image
        source={imageIcon}
        style={[
          {
            tintColor: color,
          },
          style,
        ]}
      />
    </View>
  );
};

export default TabBarOption;
