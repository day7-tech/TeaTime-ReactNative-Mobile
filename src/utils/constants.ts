import { Dimensions } from "react-native";
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const HORIZONTAL_MARGIN = 20;
export const DOUBLE_TAP_DELAY = 300;
export const verticalPaddingValue = SCREEN_HEIGHT > 700 ? 40 : 20;
export const horizontalPaddingValue = SCREEN_WIDTH > 500 ? 40 : 20;
export const verticalMarginValue = SCREEN_HEIGHT > 700 ? 40 : 20;
export const horizontalMarginValue = SCREEN_WIDTH > 500 ? 40 : 20;
export const options = [
  { label: "Post", value: "post" },
  { label: "Video", value: "video" },
  { label: "Notes", value: "notes" },
];
