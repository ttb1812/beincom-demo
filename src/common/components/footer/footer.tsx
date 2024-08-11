/*
 * Copyright © 2024 Kard Inc. All rights reserved.
 */
import React from 'react';
import { Box } from '../box';
import { IFooter } from './types';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaledSize, useAppTheme } from '../../utils';

function Footer(props: IFooter) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { children, backgroundColor, shadow, paddingHorizontal, ...restProps } =
    props;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
      keyboardVerticalOffset={
        -insets.bottom + (props.keyboardVerticalOffsetExtra || 0)
      }
    >
      <Box
        width={scaledSize.deviceWidth}
        safeAreaBottom
        backgroundColor={backgroundColor || theme.colors.background}
        shadow={shadow || '1'}
        paddingHorizontal={
          paddingHorizontal ||
          scaledSize.moderateScale(theme.sizes.horizontalPadding)
        }
        {...restProps}
      >
        {children}
      </Box>
    </KeyboardAvoidingView>
  );
}

export default React.memo(Footer);
