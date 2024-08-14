import { Pressable, StyleSheet } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { ITheme, scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';
import { IconCategory } from '../icon-category';
import { Text } from '../text';
import { PieChart } from '../pie-chart';
import { ICategories } from '../../../features/manage-category/types';
import _ from 'lodash';

interface IGroupItemProps {
  data: ICategories;
  onPress: () => void;
}

const GroupItem = (props: IGroupItemProps) => {
  const { data, onPress } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const _renderNumberOfTask = useCallback(() => {
    if (_.isEmpty(data.tasks) || _.isUndefined(data.tasks)) {
      return <></>;
    } else if ((data.tasks as any).length > 1) {
      return (
        <Text variants="body3" color={theme.palette.neutral2}>
          23 tasks
        </Text>
      );
    } else {
      return (
        <Text variants="body3" color={theme.palette.neutral2}>
          1 tasks
        </Text>
      );
    }
  }, [data.tasks, theme.palette.neutral2]);
  return (
    <Pressable onPress={onPress}>
      <Box style={styles.groupItemContainer}>
        <Box rowAlignCenter>
          <IconCategory
            icon={theme.icons.calendar}
            backgroundColor={theme.palette.neutral5}
          />
          <Box marginLeft={scaledSize.moderateScale(16)}>
            <Text variants="body1">{data.categoryName}</Text>
            {_renderNumberOfTask()}
          </Box>
        </Box>
        <Box>
          <PieChart
            radius={scaledSize.scale(26)}
            innerRadius={scaledSize.scale(20)}
            innerCircleColor={theme.palette.neutral6}
            percentTextColor={theme.palette.neutral1}
            variants="caption1"
          />
        </Box>
      </Box>
    </Pressable>
  );
};

export default memo(GroupItem);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    groupItemContainer: {
      borderRadius: scaledSize.moderateScale(24),
      paddingHorizontal: scaledSize.moderateScale(22),
      paddingVertical: scaledSize.moderateScale(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.neutral6,
    },
  });
