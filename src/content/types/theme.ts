import { ViewStyle } from 'react-native';
import styles from '../styles';
import { theme } from '../theme';
import sizes from '../theme/sizes';

type StyleType = typeof styles;

type theme = typeof theme | any;

export type SpacingType = keyof typeof theme.space;

export type SizeType = keyof typeof sizes;

export type ISpacing<Keys extends string = never> = {
  [k in SpacingType]?: number | string;
} & {
  [k in Keys]: number | string;
};

export type OpacityType = keyof typeof theme.opacity;

export type IOpacity<Keys extends string = never> = {
  [k in OpacityType]?: number;
} & {
  [k in Keys]: number;
};

export type RadiusType = keyof typeof theme.radius;

export type IRadius<Keys extends string = never> = {
  [k in RadiusType]?: number;
} & {
  [k in Keys]: number;
};

export type ShadowType = keyof typeof theme.shadows;

export type IShadow<Keys extends string = never> = {
  [k in ShadowType]?: Pick<
    ViewStyle,
    | 'elevation'
    | 'shadowColor'
    | 'shadowOffset'
    | 'shadowOpacity'
    | 'shadowRadius'
  >;
} & {
  [k in Keys]: Pick<
    ViewStyle,
    | 'elevation'
    | 'shadowColor'
    | 'shadowOffset'
    | 'shadowOpacity'
    | 'shadowRadius'
  >;
};

export type BorderWidthType = keyof typeof theme.borderWidths;

export type IBorderWidth<Keys extends string = never> = {
  [k in BorderWidthType]?: number;
} & {
  [k in Keys]: number;
};

export interface ICustomTheme extends theme {
  images: Record<string, any>;
  icons: Record<string, any>;
  styles: Partial<StyleType> & Record<string, any>;
  dark: boolean;
}

export interface ITheme extends ICustomTheme {}
