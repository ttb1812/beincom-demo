import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationService, scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';
import { IconButton } from '../icon-button';
import { Text } from '../text';
import { IHeaderProps } from './types';

const CONTENT_HEADER_HEIGHT = scaledSize.verticalScale(50);

const Header = (props: IHeaderProps) => {
  const {
    showBackButton = true,
    title,
    onBackButtonPress,
    rightButtonComponent,
  } = props;
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();
  const HEADER_HEIGHT = insets.top + CONTENT_HEADER_HEIGHT;
  const styles = useMemo(() => makeStyles(), []);

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
    <Box style={[styles.container, { height: HEADER_HEIGHT }]}>
      <Box style={[styles.content, { top: insets.top }]}>
        {_renderLeftBtn()}
        {_renderTitle()}
        {_renderRightBtn()}
      </Box>
    </Box>
  );
};

export default Header;

const makeStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: scaledSize.moderateScale(11),
    },
    content: {
      height: CONTENT_HEADER_HEIGHT,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
