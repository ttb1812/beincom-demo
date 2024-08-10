/*
 * Copyright © 2024 Kard Inc. All rights reserved.
 */
import { isBoolean, isEmpty, isArray, isFunction } from 'lodash';
import React from 'react';
import { ViewStyle, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IBox } from './types';
import useBoxViewModel from './use-box-view-model';
import { SpacingElement } from './utils';
import { ITheme, useAppTheme } from '../../../common/utils';

const usePropsResolutionWithComponentTheme = (
  baseProps: IBox | ((theme: ITheme) => IBox) = {},
  props: IBox = {},
) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const {
    isPaddingIos,
    flex,
    flexShrink,
    flexGrow,
    row,
    rowAlignCenter,
    center,
    column,
    wrap,
    alignStart,
    alignCenter,
    alignEnd,
    justifyCenter,
    justifyEnd,
    justifyStart,
    round,
    relative,
    absolute,
    style,
    spacing,
    children,
    // custom style props
    radius,
    opacity,
    shadow,
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
    padding,
    paddingEnd,
    paddingHorizontal,
    paddingStart,
    paddingVertical,
    width,
    maxWidth,
    minWidth,
    height,
    maxHeight,
    minHeight,
    top,
    left,
    right,
    bottom,
    borderWidth,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    safeArea,
    safeAreaBottom,
    safeAreaLeft,
    safeAreaRight,
    safeAreaTop,
    backgroundColor,
    ...restProps
  } = { ...props, ...(isFunction(baseProps) ? baseProps(theme) : baseProps) };

  const {
    getRadiusStyle,
    getOpacityStyle,
    getMarginStyle,
    getPaddingStyle,
    getSizeStyle,
    getBorderWidthStyle,
    getShadowStyle,
    getStyle,
    getSafeAreaStyle,
  } = useBoxViewModel();
  const blockStyles = React.useMemo((): Array<ViewStyle> => {
    const blockStylesTemp: Array<undefined | ViewStyle> = [
      getStyle(isPaddingIos, {
        paddingBottom: Platform.OS === 'ios' ? insets?.bottom : 20,
      }),
      getStyle(flex, isBoolean(flex) ? styles.block : { flex: Number(flex) }),
      getStyle(flexShrink, styles.flexShrink),
      getStyle(flexGrow, styles.flexGrow),
      getStyle(row, styles.row),
      getStyle(rowAlignCenter, styles.rowAlignCenter),
      getStyle(center, styles.center),
      getStyle(column, styles.column),
      getStyle(wrap, styles.wrap),

      getStyle(alignStart, styles.alignStart),
      getStyle(alignCenter, styles.alignCenter),
      getStyle(alignEnd, styles.alignEnd),
      getStyle(justifyCenter, styles.justifyCenter),
      getStyle(justifyStart, styles.justifyStart),
      getStyle(justifyEnd, styles.justifyEnd),
      // custom size
      ...getSizeStyle({
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
      }),
      //   custom margin
      ...getMarginStyle({
        margin,
        marginBottom,
        marginEnd,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginStart,
        marginTop,
        marginVertical,
      }),
      //   custom padding
      ...getPaddingStyle({
        padding,
        paddingEnd,
        paddingHorizontal,
        paddingStart,
        paddingVertical,
      }),
      // custom safe area
      ...getSafeAreaStyle({
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        safeArea,
        safeAreaBottom,
        safeAreaLeft,
        safeAreaRight,
        safeAreaTop,
      }),
      // custom radius
      getRadiusStyle({ radius }),
      // custom opacity
      getOpacityStyle({ opacity }),
      // custom borer-width
      getBorderWidthStyle({ borderWidth }),
      // custom shadow
      getShadowStyle({ shadow }),
      getStyle(
        round,
        isBoolean(round) ? styles.rounded : { borderRadius: Number(round) },
      ),
      getStyle(relative, styles.relative),
      getStyle(absolute, styles.absolute),
      { backgroundColor },
      { ...StyleSheet.flatten(style) },
    ];
    return blockStylesTemp.filter(e => e && !isEmpty(e)) as Array<ViewStyle>;
  }, [
    absolute,
    alignCenter,
    alignEnd,
    alignStart,
    borderWidth,
    bottom,
    center,
    column,
    flex,
    flexGrow,
    flexShrink,
    getBorderWidthStyle,
    getMarginStyle,
    getOpacityStyle,
    getPaddingStyle,
    getRadiusStyle,
    getSafeAreaStyle,
    getShadowStyle,
    getSizeStyle,
    getStyle,
    height,
    insets?.bottom,
    isPaddingIos,
    justifyCenter,
    justifyEnd,
    justifyStart,
    left,
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    opacity,
    padding,
    paddingBottom,
    paddingEnd,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingStart,
    paddingTop,
    paddingVertical,
    radius,
    relative,
    backgroundColor,
    right,
    round,
    row,
    rowAlignCenter,
    safeArea,
    safeAreaBottom,
    safeAreaLeft,
    safeAreaRight,
    safeAreaTop,
    shadow,
    style,
    top,
    width,
    wrap,
  ]);

  const renderChildComponent = React.useCallback(() => {
    if (spacing && isArray(children) && children?.length > 1) {
      let isRowDirection = false;
      if (
        (isBoolean(row) && row) ||
        (isBoolean(rowAlignCenter) && rowAlignCenter)
      ) {
        isRowDirection = true;
      } else {
        const flexDirection = StyleSheet.flatten(style || {}).flexDirection;
        if (flexDirection && ['row', 'row-reverse'].includes(flexDirection)) {
          isRowDirection = true;
        }
      }
      return (children as any).insertBetweenElement(
        <SpacingElement spacing={spacing} isRowDirection={isRowDirection} />,
      );
    }

    return children;
  }, [children, row, rowAlignCenter, spacing, style]);
  return { blockStyles, restProps, renderChildComponent };
};

export default usePropsResolutionWithComponentTheme;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  wrap: { flexWrap: 'wrap' },
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  rounded: {
    borderRadius: 99999,
  },
});
