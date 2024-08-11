import { IconButton as NBIconButton } from 'native-base';
import React, { memo, useCallback, useMemo } from 'react';
import { scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';
import { SvgFromString } from '../svg-from-string';
import { IIconButtonProps } from './types';
import { StyleSheet } from 'react-native';

const IconButton = (props: IIconButtonProps) => {
  const ICON_SIZE = scaledSize.moderateScale(24);
  const {
    disabled = false,
    onPress,
    badge,
    width = ICON_SIZE,
    height = ICON_SIZE,
    svg,
  } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);
  const _renderBadge = useCallback(() => {
    if (badge) {
      return (
        <Box backgroundColor={theme.palette.primary1} style={styles.dot} />
      );
    }
    return <></>;
  }, [badge, styles.dot, theme.palette.primary1]);
  return (
    <Box>
      <NBIconButton
        icon={<SvgFromString svg={svg} width={width} height={height} />}
        borderRadius="full"
        _pressed={{
          bg: theme.palette.neutral5,
        }}
        isDisabled={disabled}
        onPress={onPress}
      />
      {_renderBadge()}
    </Box>
  );
};

export default memo(IconButton);

const makeStyles = () =>
  StyleSheet.create({
    dot: {
      width: scaledSize.moderateScale(8),
      height: scaledSize.moderateScale(8),
      borderRadius: Number.MAX_SAFE_INTEGER,
      position: 'absolute',
      right: scaledSize.moderateScale(13),
      top: scaledSize.moderateScale(9),
    },
  });
