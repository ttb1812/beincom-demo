/*
 * Copyright © 2024 Kard Inc. All rights reserved.
 */
import { isNumber, isString, isUndefined } from 'lodash';
import React from 'react';
import { DimensionValue, View } from 'react-native';
import { SpacingType, scaledSize, useAppTheme } from '../../../common/utils';
const useReactElementHOC = (WrappedComponent: any, props: any) => (
  <WrappedComponent {...props}>{props?.children}</WrappedComponent>
);
const getSpacingSize = (
  type: 'width' | 'height' | undefined,
  size: DimensionValue | undefined,
): number => {
  const defaultSize = 0;
  if (isUndefined(size)) {
    return defaultSize;
  }

  if (isNumber(size)) {
    return size;
  } else if (isString(size) && size.includes('%') && type !== undefined) {
    const fullSize =
      type === 'width' ? scaledSize.deviceWidth : scaledSize.deviceHeight;
    const percent = Number(size.replace('%', '')) / 100;
    return fullSize * percent;
  } else if (isString(size)) {
    const reg = /^\d+$/;
    // string is number
    if (reg.test(size)) {
      if (type === 'height') {
        return scaledSize.verticalScale(Number(size));
      } else if (type === 'width') {
        return scaledSize.scale(Number(size));
      } else {
        return scaledSize.moderateScale(Number(size));
      }
    } else {
      return defaultSize;
    }
  } else {
    return defaultSize;
  }
};
const SpacingElement = React.memo<{
  spacing: SpacingType | number | undefined;
  isRowDirection: boolean;
}>(({ spacing, isRowDirection }) => {
  let spacingHeight = 0;
  let spacingWidth = 0;
  const theme = useAppTheme();

  if (spacing && typeof spacing === 'number') {
    spacingHeight = Number(spacing || '0');
    spacingWidth = spacingHeight;
  } else if (spacing && spacing in theme.space) {
    spacingHeight = getSpacingSize(
      'height',
      theme.space[spacing as SpacingType],
    );
    spacingWidth = getSpacingSize('width', theme.space[spacing as SpacingType]);
  } else {
    // @ts-ignore
  }

  return useReactElementHOC(View, {
    style: {
      height: isRowDirection
        ? undefined
        : scaledSize.moderateScale(spacingHeight),
      width: isRowDirection
        ? scaledSize.moderateScale(spacingWidth)
        : undefined,
    },
  });
});

export { SpacingElement, useReactElementHOC };
