import { Platform } from 'react-native';

export const fontFamily = {
  semiBold: Platform.select({
    ios: 'LexendDeca-SemiBold',
    android: 'LexendDeca-SemiBold',
  }),
  medium: Platform.select({
    ios: 'LexendDeca-Medium',
    android: 'LexendDeca-Medium',
  }),
  regular: Platform.select({
    ios: 'LexendDeca-Regular',
    android: 'LexendDeca-Regular',
  }),
} as const;
