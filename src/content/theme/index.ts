import styles from '../styles';
import borderWidths from './borders';
import { fontFamily } from './fonts';
import opacity from './opacity';
import { palette } from './palette';
import radius from './radius';
import { shadows } from './shadows';
import sizes from './sizes';
import { spacing } from './spacing';
import { fontWeight, fontSizes, lineHeights } from './typography';

export const theme = {
  palette,
  shadows,
  fontFamily,
  fontWeight,
  fontSizes,
  lineHeights,
  space: spacing,
  radius,
  opacity,
  sizes,
  borderWidths,
  styles,
} as const;
