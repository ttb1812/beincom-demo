import React, {
  ComponentType,
  isValidElement,
  memo,
  useCallback,
  useMemo,
} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Box } from '../box';
import { IContainerProps } from './types';
import { Image } from '../image';
import { scaledSize, useAppTheme } from '../../utils';
import _ from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = (props: IContainerProps) => {
  const { children, style, headerComponent, headerProps } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);
  const insets = useSafeAreaInsets();
  const insetStyle = useMemo(
    () => ({
      paddingTop: Platform.OS === 'android' ? insets.top : 0,
    }),
    [insets.top],
  );

  const _renderHeader = useCallback(() => {
    const isElementValid = isValidElement(headerComponent);
    const HeaderComponent = headerComponent as ComponentType<any>;
    if (_.isUndefined(headerComponent)) {
      return null;
    }
    if (isElementValid) {
      return headerComponent;
    }
    return <HeaderComponent {...headerProps} />;
  }, [headerComponent, headerProps]);

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
    return (
      <Box style={[styles.overlay, insetStyle]}>
        {_renderHeader()}
        <Box style={style} flex>
          {children}
        </Box>
      </Box>
    );
  }, [_renderHeader, children, insetStyle, style, styles.overlay]);

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
