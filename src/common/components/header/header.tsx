import { Platform, StyleSheet, ViewProps } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { Box } from '../box';
import {
  NavigationService,
  scaledSize,
  ternaryOperator,
  useAppTheme,
} from '../../utils';
import { Text } from '../text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IHeaderProps } from './types';
import { IconButton } from '../icon-button';

const Header = (props: IHeaderProps) => {
  const {
    showBackButton = true,
    title,
    onBackButtonPress,
    rightButtonComponent,
  } = props;
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(), []);
  const insetTop = useMemo(() => {
    return {
      paddingTop: ternaryOperator(Platform.OS === 'android', 0, insets.top),
    };
  }, [insets.top]) as ViewProps;

  const _onBackButtonPress = useCallback(() => {
    if (onBackButtonPress) {
      onBackButtonPress();
    } else {
      NavigationService.goBack();
    }
  }, [onBackButtonPress]);

  const _renderLeftBtn = useCallback(() => {
    if (showBackButton) {
      return (
        <Box>
          <IconButton
            svg={theme.icons.arrowLeft}
            onPress={_onBackButtonPress}
          />
        </Box>
      );
    }
    return <Box width="10" height="10" />;
  }, [_onBackButtonPress, showBackButton, theme.icons.arrowLeft]);

  const _renderTitle = useCallback(() => {
    return (
      <Box>
        <Text variants="title2">{title}</Text>
      </Box>
    );
  }, [title]);

  const _renderRightBtn = useCallback(() => {
    if (rightButtonComponent) {
      return <Box>{rightButtonComponent}</Box>;
    }
    return <Box width="10" height="10" />;
  }, [rightButtonComponent]);

  return (
    <Box style={[styles.container, insetTop]}>
      <Box rowAlignCenter style={styles.content}>
        {_renderLeftBtn()}
        {_renderTitle()}
        {_renderRightBtn()}
      </Box>
    </Box>
  );
};

export default memo(Header);

const makeStyles = () =>
  StyleSheet.create({
    container: {
      width: scaledSize.deviceWidth,
      paddingHorizontal: scaledSize.moderateScale(11),
      paddingBottom: scaledSize.moderateScale(6),
    },
    content: {
      minHeight: scaledSize.moderateScale(24),
      justifyContent: 'space-between',
    },
  });
