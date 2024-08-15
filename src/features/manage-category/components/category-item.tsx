import React, { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, IconCategory, Text } from '../../../common/components';
import { scaledSize, translate } from '../../../common/utils';
import { ICategories } from '../types';

interface ICategoryItemProps {
  data: ICategories;
  onPressCategoryItem?: () => void;
}

const CategoryItem = (props: ICategoryItemProps) => {
  const { data, onPressCategoryItem } = props;
  return (
    <Pressable onPress={onPressCategoryItem}>
      <Box style={styles.container}>
        <Box>
          <IconCategory type={data.iconType} />
        </Box>

        <Box marginLeft={scaledSize.moderateScale(16)}>
          <Text variants="body2">{translate(data.categoryName)}</Text>
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
