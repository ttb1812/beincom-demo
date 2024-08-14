import { Pressable, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { scaledSize, useAppTheme } from '../../../common/utils';
import { Box, IconCategory, Text } from '../../../common/components';
import { ICategories } from '../types';

interface ICategoryItemProps {
  data: ICategories;
  onPressCategoryItem?: () => void;
}

const CategoryItem = (props: ICategoryItemProps) => {
  const { data, onPressCategoryItem } = props;
  const theme = useAppTheme();
  return (
    <Pressable onPress={onPressCategoryItem}>
      <Box style={styles.container}>
        <Box>
          <IconCategory
            icon={theme.icons.calendar}
            backgroundColor={theme.palette.neutral5}
          />
        </Box>

        <Box marginLeft={scaledSize.moderateScale(16)}>
          <Text variants="body2">{data.categoryName}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default memo(CategoryItem);

const styles = StyleSheet.create({
  container: {
    height: scaledSize.verticalScale(52),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
