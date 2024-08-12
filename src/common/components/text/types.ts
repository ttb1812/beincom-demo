import { TextProps, TextStyle, ViewStyle } from 'react-native';

export interface ITextProps extends TextProps {
  children: any;
  color?: string;
  fontSize?: number;
  fontScale?: FontScaleType;
  variants?: TextVariants;
  marginBottom?: string | number;
  required?: boolean;
  textHighLight?: string;
  textHightLightStyle?: TextStyle;
  textAlignCenter?: boolean;
  style?: TextStyle | ViewStyle;
}

export const FontScaleType = {
  default: 'default',
  small: 'small',
  large: 'large',
  xLarge: 'xLarge',
  xxLarge: 'xxLarge',
} as const;
export type FontScaleType = keyof typeof FontScaleType;

export const TextVariants = {
  title1: 'title1',
  title2: 'title2',
  title3: 'title3',
  body1: 'body1',
  body2: 'body2',
  body3: 'body3',
  caption1: 'caption1',
  caption2: 'caption2',
};
export type TextVariants = keyof typeof TextVariants;

export type VariantTextStyle = Pick<
  TextStyle,
  'fontSize' | 'fontWeight' | 'fontFamily' | 'lineHeight'
>;
