import { Platform, StyleSheet } from 'react-native';
import { fontFamily } from '../theme/fonts';
import { fontSizes, fontWeight, lineHeights } from '../theme/typography';
export default StyleSheet.create({
  title1: {
    lineHeight: lineHeights.title1,
    fontSize: fontSizes.title1,
    ...Platform.select({
      ios: {
        fontWeight: fontWeight[600],
        fontFamily: fontFamily.semiBold,
      },
      android: {
        fontWeight: fontWeight[600],
        fontFamily: fontFamily.semiBold,
      },
    }),
  },
  title2: {
    lineHeight: lineHeights.title2,
    fontSize: fontSizes.title2,
    ...Platform.select({
      ios: {
        fontWeight: fontWeight[600],
        fontFamily: fontFamily.semiBold,
      },
      android: {
        fontWeight: fontWeight[600],
        fontFamily: fontFamily.semiBold,
      },
    }),
  },
  title3: {
    lineHeight: lineHeights.title3,
    fontSize: fontSizes.title3,
    ...Platform.select({
      ios: {
        fontWeight: fontWeight[600],
        fontFamily: fontFamily.semiBold,
      },
      android: {
        fontWeight: fontWeight[600],
        fontFamily: fontFamily.semiBold,
      },
    }),
  },
  body1: {
    lineHeight: lineHeights.body1,
    fontSize: fontSizes.body1,
    ...Platform.select({
      ios: {
        fontWeight: fontWeight[500],
        fontFamily: fontFamily.medium,
      },
      android: {
        fontWeight: fontWeight[500],
        fontFamily: fontFamily.medium,
      },
    }),
  },
  body2: {
    lineHeight: lineHeights.body2,
    fontSize: fontSizes.body2,
    ...Platform.select({
      ios: {
        fontWeight: fontWeight[400],
        fontFamily: fontFamily.regular,
      },
      android: {
        fontWeight: fontWeight[400],
        fontFamily: fontFamily.regular,
      },
    }),
  },
  body3: {
    lineHeight: lineHeights.body3,
    fontSize: fontSizes.body3,
    ...Platform.select({
      ios: {
        fontWeight: fontWeight[500],
        fontFamily: fontFamily.medium,
      },
      android: {
        fontWeight: fontWeight[500],
        fontFamily: fontFamily.medium,
      },
    }),
  },
  caption1: {
    lineHeight: lineHeights.caption1,
    fontSize: fontSizes.caption1,
    ...Platform.select({
      ios: {
        fontWeight: fontWeight[600],
        fontFamily: fontFamily.semiBold,
      },
      android: {
        fontWeight: fontWeight[600],
        fontFamily: fontFamily.semiBold,
      },
    }),
  },
  caption2: {
    lineHeight: lineHeights.caption2,
    fontSize: fontSizes.caption2,
    ...Platform.select({
      ios: {
        fontWeight: fontWeight[500],
        fontFamily: fontFamily.medium,
      },
      android: {
        fontWeight: fontWeight[500],
        fontFamily: fontFamily.medium,
      },
    }),
  },
});
