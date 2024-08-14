import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Box, GroupItem, Text } from '../../../common/components';
import { ITheme, scaledSize, useAppTheme } from '../../../common/utils';
import { useSelector } from 'react-redux';
import { getCategories } from '../../manage-category/manage-category-slice';

interface ITaskGroupsProps {
  onPressGroupItem: () => void;
}

const TaskGroups = (props: ITaskGroupsProps) => {
  const { onPressGroupItem } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const categories = useSelector(getCategories);

  const _renderBadge = useCallback(() => {
    return (
      <Box style={styles.badgeContainer}>
        <Text variants="body3" color={theme.palette.primary1}>
          {categories.length ?? 0}
        </Text>
      </Box>
    );
  }, [categories.length, styles.badgeContainer, theme.palette.primary1]);

  const _renderTitle = useCallback(() => {
    return (
      <Box style={styles.titleContainer}>
        <Text variants="title2">Task Groups</Text>
        {_renderBadge()}
      </Box>
    );
  }, [_renderBadge, styles.titleContainer]);

  return (
    <Box paddingTop={scaledSize.moderateScale(28)}>
      {_renderTitle()}
      <Box paddingTop={scaledSize.moderateScale(24)}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <GroupItem data={item} onPress={onPressGroupItem} />;
          }}
          bounces={false}
          scrollEnabled={false}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => (
            <Box height={scaledSize.moderateScale(16)} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};

export default memo(TaskGroups);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scaledSize.moderateScale(22),
    },
    badgeContainer: {
      width: scaledSize.moderateScale(24),
      height: scaledSize.moderateScale(24),
      backgroundColor: theme.palette.primary6,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Number.MAX_SAFE_INTEGER,
      marginLeft: scaledSize.moderateScale(16),
    },
    contentContainerStyle: {
      paddingHorizontal: scaledSize.moderateScale(22),
    },
  });
