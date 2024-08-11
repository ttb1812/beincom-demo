import { useCallback, useMemo } from 'react';
import { ImageProps, ImageRatios } from './types';
import { StyleSheet, ViewStyle } from 'react-native';
import { ternaryOperator } from '../../utils';
import { ImageStyle } from 'react-native-fast-image';

const useImageViewModel = (props: ImageProps) => {
  const { style, ratio: ratioProp, width, height, rounded = false } = props;

  const getFontScale = useCallback((): number | undefined => {
    switch (ratioProp as ImageRatios) {
      case 'oneToOne':
        return 1;
      case 'fourToThree':
        return 4 / 3;
      case 'sixteenToNine':
        return 16 / 9;
      case 'sixteenToTen':
        return 16 / 10;
      case 'none':
      default:
        return undefined;
    }
  }, [ratioProp]);

  const getStyles = useMemo(() => ({ ...StyleSheet.flatten(style) }), [style]);

  const stylesImage = useMemo(() => {
    const styles = { ...getStyles };
    delete styles.borderWidth;
    delete styles.borderLeftWidth;
    delete styles.borderRightWidth;
    delete styles.borderTopWidth;
    delete styles.borderBottomWidth;
    delete styles.borderStartWidth;
    delete styles.borderEndWidth;
    delete styles.borderColor;
    return [
      {
        width,
        height,
        borderRadius: ternaryOperator(
          rounded,
          Number.MAX_SAFE_INTEGER,
          styles.borderRadius,
        ),
        aspectRatio: getFontScale(),
        resizeMode: '',
      },
      styles,
    ];
  }, [getFontScale, getStyles, height, rounded, width]) as ImageStyle;

  const stylesBorder = useMemo(() => {
    const borderColor = '#333';
    const styles = getStyles;
    return {
      borderWidth: styles.borderWidth,
      borderLeftWidth: styles.borderLeftWidth,
      borderRightWidth: styles.borderRightWidth,
      borderTopWidth: styles.borderTopWidth,
      borderBottomWidth: styles.borderBottomWidth,
      borderStartWidth: styles.borderStartWidth,
      borderEndWidth: styles.borderEndWidth,
      borderColor: styles.borderColor || borderColor,
      borderBottomLeftRadius: styles.borderBottomLeftRadius,
      borderBottomRightRadius: styles.borderBottomRightRadius,
      borderRadius: ternaryOperator(
        rounded,
        Number.MAX_SAFE_INTEGER,
        styles.borderRadius,
      ),
      borderTopLeftRadius: styles.borderTopLeftRadius,
      borderTopRightRadius: styles.borderTopRightRadius,
    };
  }, [getStyles, rounded]) as ViewStyle;

  return { stylesImage, stylesBorder };
};

export default useImageViewModel;
