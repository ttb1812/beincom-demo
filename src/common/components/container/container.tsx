import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '../box';
import { IContainerProps } from './types';
import { Image } from '../image';
import { scaledSize, useAppTheme } from '../../utils';

const Container = (props: IContainerProps) => {
  const { children, style } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);

  const _renderBackground = useCallback(() => {
    return (
      <Box>
        <Image
          style={styles.backgroundImage}
          source={theme.images.background}
          showSkeletonLoading={false}
        />
      </Box>
    );
  }, [styles.backgroundImage, theme.images.background]);

  const _renderChildren = useCallback(() => {
    return <Box style={[styles.overlay, style]}>{children}</Box>;
  }, [children, style, styles.overlay]);

  return (
    <Box flex>
      {_renderBackground()}
      {_renderChildren()}
    </Box>
  );
};

export default memo(Container);

const makeStyles = () =>
  StyleSheet.create({
    backgroundImage: {
      width: scaledSize.deviceWidth,
      height: scaledSize.deviceHeight,
    },
    overlay: {
      width: scaledSize.deviceWidth,
      height: scaledSize.deviceHeight,
      position: 'absolute',
      zIndex: Number.MAX_SAFE_INTEGER,
    },
  });
