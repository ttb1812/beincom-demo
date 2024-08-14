import { Portal } from '@gorhom/portal';
import _ from 'lodash';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-screen-helper';
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaledSize } from '../../../utils';
import { Box } from '../../box';
import DrawerHeader from './drawer-header';
import DrawerItem from './drawer-item';

export interface IItemList {
  title: string;
  subTitle?: string;
  isSelected?: boolean;
}

interface ISingleDrawerProps<ItemT> {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  data: ItemT[];
  onSelect?: (item?: ItemT) => void;
  itemSelected?: ItemT;
}

const SingleDrawer = (props: ISingleDrawerProps<IItemList>) => {
  const { visible, onClose, title, data, onSelect, itemSelected } = props;
  const modalizeRef = useRef<Modalize>(null);
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(), []);

  const commonModalProps = useMemo(() => {
    const dataSize = data.length;
    const totalItemHeight = scaledSize.verticalScale(52) * dataSize;
    const headerHeight = scaledSize.verticalScale(52);
    const maxSafe = scaledSize.deviceHeight - insets.top;
    const contentHeight = totalItemHeight + getBottomSpace() + headerHeight;

    if (contentHeight > maxSafe) {
      return {
        modalHeight: maxSafe,
        modalStyle: [styles.modalStyles, { marginTop: insets.top }],
      };
    } else {
      return {
        adjustToContentHeight: true,
      };
    }
  }, [data, insets.top, styles.modalStyles]);

  const handleExpandPress = useCallback(() => {
    modalizeRef.current?.open();
  }, []);

  const handleClosePress = useCallback(() => {
    modalizeRef.current?.close();
  }, []);

  const _renderHeaderView = useCallback(() => {
    return <DrawerHeader onClose={handleClosePress} title={title} />;
  }, [handleClosePress, title]);

  const handleItemPress = useCallback(
    (item: any) => () => {
      onSelect?.(item);
      handleClosePress();
    },
    [handleClosePress, onSelect],
  );

  const isSelected = useCallback(
    (item: IItemList) => item.isSelected || _.isEqual(item, itemSelected),
    [itemSelected],
  );

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
        {...commonModalProps}
        ref={modalizeRef}
        onClose={onClose}
        handleStyle={styles.handleStyle}
        HeaderComponent={_renderHeaderView()}
        avoidKeyboardLikeIOS
        dragToss={0.5}
        flatListProps={{
          bounces: false,
          data: data,
          keyExtractor: (item, index) => index.toString(),
          ListFooterComponent: () => <Box height={getBottomSpace()} />,
          showsVerticalScrollIndicator: false,
          renderItem: ({ item }) => {
            return (
              <DrawerItem
                title={item.title}
                isSelected={isSelected(item)}
                onPress={handleItemPress(item)}
              />
            );
          },
        }}
      />
    </Portal>
  );
};

export default memo(SingleDrawer);

const makeStyles = () =>
  StyleSheet.create({
    handleStyle: {
      backgroundColor: 'transparent',
    },
    modalStyles: {
      flex: 1,
    },
  });
