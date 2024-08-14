import { StyleSheet } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import DrawerHeader from './drawer-header';
import { Box } from '../../box';
import { Text } from '../../text';
import { Modalize } from 'react-native-modalize';
import { scaledSize, useAppTheme } from '../../../utils';
import { Portal } from '@gorhom/portal';

interface ISingleDrawerProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
}

const SingleDrawer = (props: ISingleDrawerProps) => {
  const { visible, onClose, title } = props;
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
      <DrawerHeader
        onClose={handleClosePress}
        onDone={handleClosePress}
        title={title}
      />
    );
  }, [handleClosePress, title]);

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
      >
        <Box>
          <Text>sfd</Text>
        </Box>
      </Modalize>
    </Portal>
  );
};

export default memo(SingleDrawer);

const makeStyles = () =>
  StyleSheet.create({
    handleStyle: {
      backgroundColor: 'transparent',
    },
  });
