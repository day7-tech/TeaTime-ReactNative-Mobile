import {Dimensions} from 'react-native';

/**
 * Constant representing the screen width.
 */
export const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * Constant representing the screen height.
 */
export const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * Constant representing the horizontal margin value.
 */
export const HORIZONTAL_MARGIN = 20;

/**
 * Constant representing the delay for double tap.
 */
export const DOUBLE_TAP_DELAY = 300;

/**
 * Constant representing the vertical padding value.
 * Adjusted based on the screen height.
 */
export const verticalPaddingValue = SCREEN_HEIGHT > 700 ? 40 : 20;

/**
 * Constant representing the horizontal padding value.
 * Adjusted based on the screen width.
 */
export const horizontalPaddingValue = SCREEN_WIDTH > 500 ? 40 : 20;

/**
 * Constant representing the vertical margin value.
 * Adjusted based on the screen height.
 */
export const verticalMarginValue = SCREEN_HEIGHT > 700 ? 40 : 20;

/**
 * Constant representing the horizontal margin value.
 * Adjusted based on the screen width.
 */
export const horizontalMarginValue = SCREEN_WIDTH > 500 ? 40 : 20;

/**
 * Array of options for selection.
 */
export const options = [
  {label: 'Post', value: 'post'},
  {label: 'Video', value: 'video'},
  {label: 'Notes', value: 'notes'},
];
