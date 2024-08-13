import { FlatList, Pressable, StyleSheet } from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import { ITheme, scaledSize, ternaryOperator, useAppTheme } from '../../utils';
import { Box } from '../box';
import { Text } from '../text';

const DATA = [
  { id: '1', title: 'All', key: 'all' },
  { id: '2', title: 'To do', key: 'toDo' },
  { id: '3', title: 'Completed', key: 'completed' },
];

const FilterCarousel = () => {
  const [filters] = useState<any[]>(DATA);
  const [selectedItem, setSelectedItem] = useState(DATA[0]);
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const _renderDateItem = ({ item }: any) => {
    const isSelected = item === selectedItem;
    return (
      <Pressable onPress={() => setSelectedItem(item)}>
        <Box style={[styles.dateItem, isSelected && styles.selectedDateItem]}>
          <Text
            style={ternaryOperator(
              isSelected,
              styles.selectedText,
              styles.unAelectedText,
            )}
            variants="title2"
          >
            {item.title}
          </Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box style={styles.container}>
      <FlatList
        horizontal
        data={filters}
        renderItem={_renderDateItem}
        keyExtractor={item => item?.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={() => <Box width="4" />}
      />
    </Box>
  );
};

export default memo(FilterCarousel);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      // marginTop: scaledSize.moderateScale(28),
    },
    contentContainerStyle: {
      paddingHorizontal: scaledSize.moderateScale(22),
    },
    dateItem: {
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scaledSize.moderateScale(12),
      paddingHorizontal: scaledSize.moderateScale(16),
      borderRadius: scaledSize.moderateScale(24),
      minWidth: scaledSize.scale(60),
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
