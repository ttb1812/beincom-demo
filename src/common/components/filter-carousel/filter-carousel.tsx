import React, { memo, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import {
  ITheme,
  scaledSize,
  ternaryOperator,
  translate,
  useAppTheme,
} from '../../utils';
import { Box } from '../box';
import { Text } from '../text';
import { IFilterCarouselProps, IFilterItem } from './types';

const FilterCarousel = (props: IFilterCarouselProps<IFilterItem>) => {
  const { filterOption, setFilterOption, filters } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const _renderDateItem = ({ item }: any) => {
    const isSelected = item === filterOption;
    return (
      <Pressable
        onPress={() => {
          setFilterOption?.(item);
        }}
      >
        <Box style={[styles.dateItem, isSelected && styles.selectedDateItem]}>
          <Text
            style={ternaryOperator(
              isSelected,
              styles.selectedText,
              styles.unAelectedText,
            )}
            variants="title2"
          >
            {translate(item.title)}
          </Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box>
      <FlatList
        horizontal
        data={filters}
        renderItem={_renderDateItem}
        keyExtractor={item => item?.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={() => (
          <Box width={scaledSize.moderateScale(16)} />
        )}
      />
    </Box>
  );
};

export default memo(FilterCarousel);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
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
