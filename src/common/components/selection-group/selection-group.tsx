import React, { memo, useMemo, useRef, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ITheme, scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';
import { SvgFromString } from '../svg-from-string';
import { Text } from '../text';
import { Drawer } from '../drawer';

const SelectionGroup = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const ICON_SIZE = scaledSize.moderateScale(24);
  const [modalVisible, setModalVisible] = useState(false);

  const onOpen = () => {
    setModalVisible(true);
  };
  return (
    <>
      <Pressable style={styles.container} onPress={onOpen}>
        <Box rowAlignCenter>
          <SvgFromString
            svg={theme.icons.calendarPicker}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
          <Box marginLeft={scaledSize.moderateScale(12)}>
            <Text variants="caption2" style={styles.title}>
              Task Group
            </Text>
            <Text variants="body1">Work</Text>
          </Box>
        </Box>

        <SvgFromString
          svg={theme.icons.arrowDown}
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      </Pressable>

      <Drawer
        title="Groups"
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <Box>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
        </Box>
      </Drawer>
    </>
  );
};

export default memo(SelectionGroup);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: scaledSize.verticalScale(63),
      borderRadius: scaledSize.moderateScale(16),
      backgroundColor: theme.palette.neutral6,
      paddingHorizontal: scaledSize.moderateScale(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: theme.palette.neutral5,
    },
    title: {
      fontWeight: '400',
      color: theme.palette.neutral2,
    },
  });
