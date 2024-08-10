import { get } from 'lodash';
import { useCallback, useMemo } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { scaledSize, useAppTheme } from '../../utils';
import { FontScaleType, ITextProps, VariantTextStyle } from './types';

const useTextViewModel = (props: ITextProps) => {
  const theme = useAppTheme();
  const {
    style,
    color,
    marginBottom,
    fontScale = 'default',
    variants,
    textAlignCenter,
  } = props;

  const getFontScale = useCallback(
    (size: number): number => {
      switch (fontScale as FontScaleType) {
        case 'small':
          return size - size * 0.25;
        case 'large':
          return size + size * 0.25;
        case 'xLarge':
          return size + size * 0.5;
        case 'xxLarge':
          return size + size * 0.75;
        default:
          return size;
      }
    },
    [fontScale],
  );

  const fontSizeWithVariants = useMemo(() => {
    let variant: VariantTextStyle = {};
    if (variants) {
      switch (variants) {
        case 'title1':
          variant = Object.assign(variant, get(theme.styles, 'title1', {}));
          break;
        case 'title2':
          variant = Object.assign(variant, get(theme.styles, 'title2', {}));
          break;
        case 'title3':
          variant = Object.assign(variant, get(theme.styles, 'title3', {}));
          break;
        case 'body1':
          variant = Object.assign(variant, get(theme.styles, 'body1', {}));
          break;
        case 'body2':
          variant = Object.assign(variant, get(theme.styles, 'body2', {}));
          break;
        case 'body3':
          variant = Object.assign(variant, get(theme.styles, 'body3', {}));
          break;
        case 'caption1':
          variant = Object.assign(variant, get(theme.styles, 'caption1', {}));
          break;
        case 'caption2':
          variant = Object.assign(variant, get(theme.styles, 'caption2', {}));
          break;
        default:
          variant = Object.assign(variant, get(theme.styles, 'body2', {}));
          break;
      }
    }

    return variant;
  }, [variants, theme]);

  const stylesText = useMemo(() => {
    const colorText = theme.palette.neutral1;
    const {
      fontSize: fontSizeConverted,
      fontFamily,
      lineHeight,
    } = fontSizeWithVariants;

    return [
      {
        color: color ? color : colorText,
        marginBottom,
        fontFamily,
        lineHeight,
        fontSize: getFontScale(
          Number(scaledSize.moderateScale(fontSizeConverted ?? 14)),
        ),
      },
      textAlignCenter ? { textAlign: 'center' } : {},
      { ...StyleSheet.flatten(style) },
    ];
  }, [
    theme.palette,
    fontSizeWithVariants,
    color,
    marginBottom,
    getFontScale,
    textAlignCenter,
    style,
  ]);

  const requiredTextStyle: TextStyle = useMemo(
    () => ({
      ...theme.styles.body2,
      color: theme.palette.semantic1,
    }),
    [theme],
  );

  return { stylesText, requiredTextStyle };
};

export default useTextViewModel;
