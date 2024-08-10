/*
 * Copyright © 2024 Kard Inc. All rights reserved.
 */
import { isUndefined, isNumber, get, isString } from 'lodash';
import { ViewStyle } from 'react-native';
import { SizeType, scaledSize, useAppTheme } from '../../../common/utils';
import { IBox } from './types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
const useBoxViewModel = () => {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();
  const getSize = React.useCallback(
    (
      key: keyof ViewStyle,
      size: number | SizeType | undefined,
      obj: object,
    ): ViewStyle => {
      if (isUndefined(size)) {
        return { [key]: size };
      } else if (isNumber(size)) {
        return { [key]: Number(size) };
      } else {
        const actualSize = get(obj, size, undefined);
        if (actualSize === undefined) {
          const reg = /^\d+$/;
          return {
            [key]: reg.test(size.toString().replace('%', ''))
              ? size
              : undefined,
          };
        } else if (isString(actualSize)) {
          return { [key]: actualSize };
        } else {
          const verticals = [
            'minHeight',
            'height',
            'maxHeight',
            'top',
            'bottom',
          ];
          const horizontals = [
            'width',
            'minWidth',
            'maxWidth',
            'left',
            'right',
          ];
          if (verticals.includes(key)) {
            return { [key]: scaledSize.verticalScale(Number(actualSize || 0)) };
          }
          if (horizontals.includes(key)) {
            return { [key]: scaledSize.scale(Number(actualSize || 0)) };
          }
          return { [key]: scaledSize.moderateScale(Number(actualSize || 0)) };
        }
      }
    },
    [],
  );

  const getRadiusStyle = React.useCallback(
    ({ radius }: { radius: IBox['radius'] }): ViewStyle => {
      if (isUndefined(radius) || isNumber(radius)) {
        return { borderRadius: radius };
      }

      const radiusSize = get(theme.radius, radius, undefined);
      return { borderRadius: radiusSize };
    },
    [theme],
  );

  const getOpacityStyle = React.useCallback(
    ({ opacity }: { opacity: IBox['opacity'] }): ViewStyle => {
      if (isUndefined(opacity) || isNumber(opacity)) {
        return { opacity };
      }
      const opacitySize = get(theme.opacity, opacity, undefined);
      return { opacity: opacitySize };
    },
    [theme],
  );

  const getMarginStyle = React.useCallback(
    ({
      margin,
      marginBottom,
      marginEnd,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginStart,
      marginTop,
      marginVertical,
    }: {
      margin: IBox['margin'];
      marginBottom: IBox['marginBottom'];
      marginEnd: IBox['marginEnd'];
      marginHorizontal: IBox['marginHorizontal'];
      marginLeft: IBox['marginLeft'];
      marginRight: IBox['marginRight'];
      marginStart: IBox['marginStart'];
      marginTop: IBox['marginTop'];
      marginVertical: IBox['marginVertical'];
    }): Array<ViewStyle> => {
      return [
        getSize('margin', margin, theme.space),
        getSize('marginBottom', marginBottom, theme.space),
        getSize('marginEnd', marginEnd, theme.space),
        getSize('marginHorizontal', marginHorizontal, theme.space),
        getSize('marginLeft', marginLeft, theme.space),
        getSize('marginRight', marginRight, theme.space),
        getSize('marginStart', marginStart, theme.space),
        getSize('marginTop', marginTop, theme.space),
        getSize('marginVertical', marginVertical, theme.space),
      ];
    },
    [theme.space, getSize],
  );

  const getPaddingStyle = React.useCallback(
    ({
      padding,
      paddingEnd,
      paddingHorizontal,
      paddingStart,
      paddingVertical,
    }: {
      padding: IBox['padding'];
      paddingEnd: IBox['paddingEnd'];
      paddingHorizontal: IBox['paddingHorizontal'];
      paddingStart: IBox['paddingStart'];
      paddingVertical: IBox['paddingVertical'];
    }): Array<ViewStyle> => {
      return [
        getSize('padding', padding, theme.space),
        getSize('paddingEnd', paddingEnd, theme.space),
        getSize('paddingHorizontal', paddingHorizontal, theme.space),
        getSize('paddingStart', paddingStart, theme.space),
        getSize('paddingVertical', paddingVertical, theme.space),
      ];
    },
    [getSize, theme.space],
  );

  const getSizeStyle = React.useCallback(
    ({
      bottom,
      height,
      left,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      right,
      top,
      width,
    }: {
      bottom: IBox['bottom'];
      height: IBox['height'];
      left: IBox['left'];
      maxHeight: IBox['maxHeight'];
      maxWidth: IBox['maxWidth'];
      minHeight: IBox['minHeight'];
      minWidth: IBox['minWidth'];
      right: IBox['right'];
      top: IBox['top'];
      width: IBox['width'];
    }): Array<ViewStyle> => {
      return [
        getSize('width', width, theme.sizes),
        getSize('maxWidth', maxWidth, theme.sizes),
        getSize('minWidth', minWidth, theme.sizes),
        getSize('height', height, theme.sizes),
        getSize('maxHeight', maxHeight, theme.sizes),
        getSize('minHeight', minHeight, theme.sizes),
        getSize('top', top, theme.sizes),
        getSize('left', left, theme.sizes),
        getSize('right', right, theme.sizes),
        getSize('bottom', bottom, theme.sizes),
      ];
    },
    [getSize, theme.sizes],
  );

  const getBorderWidthStyle = React.useCallback(
    ({ borderWidth }: { borderWidth: IBox['borderWidth'] }): ViewStyle => {
      if (borderWidth === undefined || typeof borderWidth === 'number') {
        return { borderWidth };
      }

      const borderWidthSize = get(theme.borderWidths, borderWidth, undefined);
      return { borderWidth: borderWidthSize };
    },
    [theme.borderWidths],
  );

  const getShadowStyle = React.useCallback(
    ({ shadow }: { shadow: IBox['shadow'] }): ViewStyle => {
      if (shadow === undefined) {
        return { ...get(theme.shadows, 'none', {}) };
      }

      if (typeof shadow === 'boolean') {
        return { ...get(theme.shadows, '1', {}) };
      }

      return { ...get(theme.shadows, shadow, {}) };
    },
    [theme.shadows],
  );

  const getStyle = React.useCallback(
    <T = any>(field: T, style: ViewStyle | undefined): ViewStyle => {
      if (isUndefined(field) || isUndefined(style)) {
        return {};
      }
      return style;
    },
    [],
  );

  const getSafeAreaStyle = React.useCallback(
    ({
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      safeArea,
      safeAreaBottom,
      safeAreaLeft,
      safeAreaRight,
      safeAreaTop,
    }: {
      paddingBottom: IBox['paddingBottom'];
      paddingLeft: IBox['paddingLeft'];
      paddingRight: IBox['paddingRight'];
      paddingTop: IBox['paddingTop'];
      safeArea: IBox['safeArea'];
      safeAreaBottom: IBox['safeAreaBottom'];
      safeAreaLeft: IBox['safeAreaLeft'];
      safeAreaRight: IBox['safeAreaRight'];
      safeAreaTop: IBox['safeAreaTop'];
    }): ViewStyle[] => {
      const leftStyle = getSize('paddingLeft', paddingLeft, theme.space);
      if (!isUndefined(safeArea) || !isUndefined(safeAreaLeft)) {
        leftStyle.paddingLeft =
          Number(leftStyle.paddingLeft || '0') +
          Number(safeArea || safeAreaLeft ? insets?.left : '0');
      }

      const topStyle = getSize('paddingTop', paddingTop, theme.space);
      if (!isUndefined(safeArea) || !isUndefined(safeAreaTop)) {
        topStyle.paddingTop =
          Number(topStyle.paddingTop || '0') +
          Number(safeArea || safeAreaTop ? insets?.top : '0');
      }

      const rightStyle = getSize('paddingRight', paddingRight, theme.space);
      if (!isUndefined(safeArea) || !isUndefined(safeAreaRight)) {
        rightStyle.paddingRight =
          Number(rightStyle.paddingRight || '0') +
          Number(safeArea || safeAreaRight ? insets?.right : '0');
      }

      const bottomStyle = getSize('paddingBottom', paddingBottom, theme.space);
      if (!isUndefined(safeArea) || !isUndefined(safeAreaBottom)) {
        bottomStyle.paddingBottom =
          Number(bottomStyle.paddingBottom || '0') +
          Number(safeArea || safeAreaBottom ? insets?.bottom : '0');
      }

      return [leftStyle, topStyle, rightStyle, bottomStyle];
    },
    [getSize, insets, theme.space],
  );

  return {
    getRadiusStyle,
    getOpacityStyle,
    getMarginStyle,
    getPaddingStyle,
    getSizeStyle,
    getBorderWidthStyle,
    getShadowStyle,
    getStyle,
    getSafeAreaStyle,
  };
};

export default useBoxViewModel;
