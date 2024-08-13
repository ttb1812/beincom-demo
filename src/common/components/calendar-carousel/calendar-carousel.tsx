import { FlatList, Pressable, StyleSheet } from 'react-native';
import React, { memo, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { ITheme, scaledSize, ternaryOperator, useAppTheme } from '../../utils';
import { Box } from '../box';
import { Text } from '../text';

const CalendarCarousel = () => {
  const [dates, setDates] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  useEffect(() => {
    const generateDates = () => {
      const today = moment();
      const daysArray = Array.from({ length: 61 }, (_, index) =>
        today
          .clone()
          .add(index - 30, 'days')
          .format('YYYY-MM-DD'),
      );

      setDates(daysArray);
    };

    generateDates();
  }, []);

  const _renderDateItem = ({ item }: any) => {
    const isSelected = item === selectedDate;
    return (
      <Pressable onPress={() => setSelectedDate(item)}>
        <Box style={[styles.dateItem, isSelected && styles.selectedDateItem]}>
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

  return (
    <Box style={styles.container}>
      <FlatList
        horizontal
        data={dates}
        renderItem={_renderDateItem}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={() => <Box width="4" />}
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
      width: scaledSize.scale(80),
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
