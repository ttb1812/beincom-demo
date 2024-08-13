import { Pressable, StyleSheet } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from '@gorhom/portal';
import { Box } from '../box';
import { Text } from '../text';
import { scaledSize, useAppTheme } from '../../utils';
import SvgFromString from '../svg-from-string/svg-from-string';
import { IconButton } from '../icon-button';
import { getBottomSpace } from 'react-native-iphone-screen-helper';

interface IDrawerProps {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
}

const Drawer = (props: IDrawerProps) => {
  const { visible, children, onClose, title } = props;
  const modalizeRef = useRef<Modalize>(null);
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);

  const handleExpandPress = useCallback(() => {
    modalizeRef.current?.open();
  }, []);

  const handleClosePress = useCallback(() => {
    modalizeRef.current?.close();
  }, []);

  const _renderHeaderView = useCallback(() => {
    return (
      <Box style={styles.headerContainer}>
        <IconButton svg={theme.icons.cancle} onPress={handleClosePress} />
        <Text variants="title1">{title}</Text>
        <IconButton svg={theme.icons.check} onPress={handleClosePress} />
      </Box>
    );
  }, [
    handleClosePress,
    styles.headerContainer,
    theme.icons.cancle,
    theme.icons.check,
    title,
  ]);

  useEffect(() => {
    if (visible) {
      handleExpandPress();
    } else {
      handleClosePress();
    }
  }, [handleClosePress, handleExpandPress, visible]);

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        onClose={onClose}
        handleStyle={styles.handleStyle}
        HeaderComponent={_renderHeaderView()}
        avoidKeyboardLikeIOS
        FooterComponent={
          <Box height={getBottomSpace() ?? scaledSize.moderateScale(16)} />
        }
      >
        <Box style={styles.content}>{children}</Box>
      </Modalize>
    </Portal>
  );
};

export default memo(Drawer);

const makeStyles = () =>
  StyleSheet.create({
    handleStyle: {
      backgroundColor: 'transparent',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scaledSize.moderateScale(11),
      paddingVertical: scaledSize.moderateScale(6),
      justifyContent: 'space-between',
    },
    content: {
      paddingHorizontal: scaledSize.moderateScale(22),
    },
  });
