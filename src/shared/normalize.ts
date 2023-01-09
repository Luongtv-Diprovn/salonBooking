//setting normalize
import { Dimensions, Platform } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { isTablet } from 'react-native-device-info';

export const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// Default guideline sizes are based on iPhone X
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;
export const normalizeHorizontal = (size: number, factor = 0.5) =>
  Math.floor(size + (scale(size) - size) * factor);
export const normalize = (size: number, factor = 0.5) =>
  Math.round(size + (verticalScale(size) - size) * factor);

export const s = scale;
export const vs = verticalScale;
export const nl = normalize;
export const nlv = normalize;

export function isIphoneX() {
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
}

export const isIpadOrTablet = Platform.OS === "ios" ? Platform.isPad : isTablet();

export function ExtraHight(number: number) {
  const newNumber = Platform.OS === "ios" ? normalize(number) : normalize(number / 2);
  return newNumber;
}

const STANDARD_WIDTH = 375;
const STANDARD_HEIGHT = 680;

const hp = height > width ? heightPercentageToDP : widthPercentageToDP;
const wp = height > width ? widthPercentageToDP : heightPercentageToDP;

export const pixelToDpiW = (pixel: number) => wp((pixel * 100) / STANDARD_WIDTH);
export const pixelToDpiH = (pixel: number) => hp((pixel * 100) / STANDARD_HEIGHT);
