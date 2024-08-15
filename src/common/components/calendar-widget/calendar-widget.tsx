import React, { memo, useCallback, useMemo } from 'react';
import { DeviceEventEmitter, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ITheme, scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { CalendarAction } from '../../../features/calendar/calendar-slice';
import { ICalendarWidgetProps } from './types';

const CalendarWidget = (props: ICalendarWidgetProps) => {
  const today = moment().format('YYYY-MM-DD');
  const {
    selectedDate = today,
    setSelectedDate,
    monthSelected,
    setMonthSelected,
  } = props;
  const dispatch = useDispatch();
  const theme = useAppTheme();
  const CALENDAR_WIDTH = scaledSize.deviceWidth - scaledSize.moderateScale(44);
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const parserMarkedDates = useMemo(() => {
    const daysInMonth = moment(monthSelected).daysInMonth();
    const formattedMonth = moment(monthSelected).format('YYYY-MM');
    const dateInMonth = Array.from(
      { length: daysInMonth },
      (_, index) => `${formattedMonth}-${String(index + 1).padStart(2, '0')}`,
    );
    return dateInMonth.reduce((acc: any, date) => {
      acc[date] = {
        selected: date === selectedDate,
        selectedColor: theme.palette.primary1,
      };
      return acc;
    }, {});
  }, [monthSelected, selectedDate, theme.palette.primary1]);

  const handleOnDayPress = useCallback(
    (day: any) => {
      setSelectedDate(day.dateString);
      const formattedDaySelect = moment(day?.dateString);
      const daysArray = Array.from({ length: 15 }, (_, index) =>
        formattedDaySelect
          .clone()
          .add(index - 7, 'days')
          .format('YYYY-MM-DD'),
      );
      dispatch(CalendarAction.setCalendarCarousel({ dates: daysArray }));
      DeviceEventEmitter.emit('scrollToDayIndex');
    },
    [dispatch, setSelectedDate],
  );

  return (
    <Box style={styles.container} width={CALENDAR_WIDTH}>
      <Calendar
        hideExtraDays={true}
        theme={{
          calendarBackground: 'transparent',
          dayTextColor: theme.palette.primary1,
          monthTextColor: theme.palette.primary1,
          textSectionTitleColor: theme.palette.primary1,
          todayTextColor: theme.palette.primary1,
          textMonthFontSize: scaledSize.moderateScale(20),
          textMonthFontFamily: theme.fontFamily.semiBold,
          textDayFontFamily: theme.fontFamily.regular,
          arrowColor: theme.palette.primary1,
          textMonthFontWeight: '600',
        }}
        onDayPress={handleOnDayPress}
        onMonthChange={(month: any) => {
          setMonthSelected(month.dateString);
        }}
        markedDates={parserMarkedDates}
        initialDate={monthSelected}
        showSixWeeks={false}
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
