import { ViewProps, ViewStyle } from 'react-native';
import {
  SpacingType,
  OpacityType,
  SizeType,
  RadiusType,
  ShadowType,
  BorderWidthType,
} from '../../../common/utils';

type IViewStyle = Omit<
  ViewStyle,
  | 'flex'
  | 'opacity'
  | 'borderWidth'
  | 'bottom'
  | 'padding'
  | 'paddingBottom'
  | 'paddingEnd'
  | 'paddingHorizontal'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingStart'
  | 'paddingTop'
  | 'paddingVertical'
  | 'margin'
  | 'marginBottom'
  | 'marginEnd'
  | 'marginHorizontal'
  | 'marginLeft'
  | 'marginRight'
  | 'marginStart'
  | 'marginTop'
  | 'marginVertical'
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'height'
  | 'maxHeight'
  | 'minHeight'
  | 'left'
  | 'right'
  | 'start'
  | 'top'
>;
export interface IBox extends ViewProps, IViewStyle {
  row?: boolean;
  rowAlignCenter?: boolean;
  center?: boolean;
  column?: boolean;
  alignStart?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  wrap?: boolean;
  justifyCenter?: boolean;
  justifyEnd?: boolean;
  justifyStart?: boolean;
  round?: boolean | number;
  relative?: boolean;
  absolute?: boolean;
  isPaddingIos?: boolean;
  safeArea?: boolean;
  safeAreaTop?: boolean;
  safeAreaLeft?: boolean;
  safeAreaRight?: boolean;
  safeAreaBottom?: boolean;
  flex?: boolean | number;
  /**
   * custom radius
   * @type
   * none: 0,
   * xs: 2,
   * sm: 4,
   * md: 6,
   * lg: 8,
   * xl: 12,
   * '2xl': 16,
   * '3xl': 24,
   * full: 9999,
   * */
  radius?: RadiusType | number;
  //   custom spacing
  spacing?: SpacingType | number;
  //   custom margin
  margin?: number | SpacingType;
  marginBottom?: number | SpacingType;
  marginEnd?: number | SpacingType;
  marginHorizontal?: number | SpacingType;
  marginLeft?: number | SpacingType;
  marginRight?: number | SpacingType;
  marginStart?: number | SpacingType;
  marginTop?: number | SpacingType;
  marginVertical?: number | SpacingType;
  //   custom padding
  padding?: number | SpacingType;
  paddingBottom?: number | SpacingType;
  paddingEnd?: number | SpacingType;
  paddingHorizontal?: number | SpacingType;
  paddingLeft?: number | SpacingType;
  paddingRight?: number | SpacingType;
  paddingStart?: number | SpacingType;
  paddingTop?: number | SpacingType;
  paddingVertical?: number | SpacingType;
  //   custom size
  width?: number | SizeType;
  maxWidth?: number | SizeType;
  minWidth?: number | SizeType;
  height?: number | SizeType;
  maxHeight?: number | SizeType;
  minHeight?: number | SizeType;
  left?: number | SizeType;
  right?: number | SizeType;
  start?: number | SizeType;
  top?: number | SizeType;
  bottom?: number | SizeType;
  //   custom borderWidth
  borderWidth?: number | BorderWidthType;
  //   custom opacity
  opacity?: number | OpacityType | undefined;
  // custom shadow
  shadow?: boolean | ShadowType;
}
