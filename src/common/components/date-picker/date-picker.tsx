import { StyleSheet, Pressable } from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import { ITheme, scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';
import { Text } from '../text';
import SvgFromString from '../svg-from-string/svg-from-string';
import RNDatePicker from 'react-native-date-picker';
import { IDatePickerProps } from './types';

const DatePicker = (props: IDatePickerProps) => {
  const { title, onDateChange } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const ICON_SIZE = scaledSize.moderateScale(24);
  const [open, setOpen] = useState(false);

  const onDateTimeChange = (date: Date) => {
    onDateChange?.(date);
  };

  return (
    <>
      <Pressable style={styles.container} onPress={() => setOpen(true)}>
        <Box rowAlignCenter>
          <SvgFromString
            svg={theme.icons.calendarPicker}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
          <Box marginLeft={scaledSize.moderateScale(12)}>
            <Text variants="caption2" style={styles.title}>
              {title}
            </Text>
            <Text variants="body3">01 May, 2022</Text>
          </Box>
        </Box>

        <SvgFromString
          svg={theme.icons.arrowDown}
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      </Pressable>
      <RNDatePicker
        modal
        mode="datetime"
        open={open}
        date={new Date()}
        onConfirm={onDateTimeChange}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default memo(DatePicker);

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
    },
    title: {
      fontWeight: '400',
      color: theme.palette.neutral2,
    },
  });
