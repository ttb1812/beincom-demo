import React, { memo, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ITheme, scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';

const CalendarWidget = () => {
  const theme = useAppTheme();
  const CALENDAR_WIDTH = scaledSize.deviceWidth - scaledSize.moderateScale(44);
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [selected, setSelected] = useState('');

  return (
    <Box style={styles.container} width={CALENDAR_WIDTH}>
      <Calendar
        hideExtraDays={true}
        theme={{
          calendarBackground: 'transparent',
          dayTextColor: theme.palette.primary1,
          monthTextColor: theme.palette.primary1,
          textSectionTitleColor: theme.palette.primary1,
          todayTextColor: theme.palette.neutral5,
          textMonthFontSize: scaledSize.moderateScale(20),
          textMonthFontFamily: theme.fontFamily.semiBold,
          textDayFontFamily: theme.fontFamily.regular,
          arrowColor: theme.palette.primary1,
          textMonthFontWeight: '600',
        }}
      />
    </Box>
  );
};

export default memo(CalendarWidget);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: scaledSize.moderateScale(22),
      borderRadius: scaledSize.moderateScale(24),
      backgroundColor: theme.palette.primary6,
    },
  });
