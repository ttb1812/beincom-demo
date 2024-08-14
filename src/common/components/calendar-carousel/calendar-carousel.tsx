import moment from 'moment';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  DeviceEventEmitter,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ITheme, scaledSize, ternaryOperator, useAppTheme } from '../../utils';
import { Box } from '../box';
import { Text } from '../text';
import { getCalendarCarousel } from '../../../features/calendar/calendar-slice';

interface ICalendarCarouselProp {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}
const CalendarCarousel = (props: ICalendarCarouselProp) => {
  const today = moment().format('YYYY-MM-DD');
  const { selectedDate = today, setSelectedDate } = props;
  const DATE_WIDTH = scaledSize.scale(80);
  const dates = useSelector(getCalendarCarousel);

  const listRef = useRef<FlatList>(null);
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const indexToScroll = useMemo(() => {
    return dates?.map(item => item === selectedDate)?.indexOf(true) || 0;
  }, [dates, selectedDate]);

  const _renderDateItem = ({ item }: any) => {
    const isSelected = item === selectedDate;
    return (
      <Pressable onPress={() => setSelectedDate?.(item)}>
        <Box
          style={[styles.dateItem, isSelected && styles.selectedDateItem]}
          width={DATE_WIDTH}
        >
          <Text
            style={ternaryOperator(
              isSelected,
              styles.selectedText,
              styles.unAelectedText,
            )}
          >
            {moment(item).format('MMM')}
          </Text>
          <Text
            style={ternaryOperator(
              isSelected,
              styles.selectedText,
              styles.unAelectedText,
            )}
            variants="title2"
          >
            {moment(item).format('DD')}
          </Text>
          <Text
            style={ternaryOperator(
              isSelected,
              styles.selectedText,
              styles.unAelectedText,
            )}
          >
            {moment(item).format('ddd')}
          </Text>
        </Box>
      </Pressable>
    );
  };

  const handleScrollToIndex = useCallback(() => {
    listRef.current?.scrollToIndex({
      animated: true,
      index: indexToScroll,
      viewOffset: DATE_WIDTH * 2,
    });
  }, [DATE_WIDTH, indexToScroll]);

  useEffect(() => {
    const evScrollToDayIndex = DeviceEventEmitter.addListener(
      'scrollToDayIndex',
      () => {
        handleScrollToIndex();
      },
    );
    return () => {
      evScrollToDayIndex.remove();
    };
  }, [handleScrollToIndex]);

  return (
    <Box style={styles.container}>
      <FlatList
        ref={listRef}
        horizontal
        data={dates}
        renderItem={_renderDateItem}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={() => <Box width="4" />}
        onScrollToIndexFailed={() => {
          const wait = new Promise(resolve => setTimeout(resolve, 700));
          wait.then(() => {
            listRef.current?.scrollToIndex({
              index: indexToScroll,
              animated: false,
              viewOffset: DATE_WIDTH * 2,
            });
          });
        }}
      />
    </Box>
  );
};

export default memo(CalendarCarousel);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {},
    contentContainerStyle: {
      paddingHorizontal: scaledSize.moderateScale(22),
    },
    dateItem: {
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scaledSize.moderateScale(12),
      borderRadius: scaledSize.moderateScale(24),
      height: scaledSize.verticalScale(108),
      backgroundColor: theme.palette.neutral6,
    },
    selectedDateItem: {
      backgroundColor: theme.palette.primary1,
    },
    selectedText: {
      color: theme.palette.neutral6,
    },
    unAelectedText: {
      color: theme.palette.neutral1,
    },
  });
