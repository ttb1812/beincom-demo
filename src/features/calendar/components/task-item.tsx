import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, SvgFromString, Text } from '../../../common/components';
import { ITheme, scaledSize, useAppTheme } from '../../../common/utils';
import { ITaskItem, STATUS_ENUM } from '../../manage-category/types';
interface ITaskItemProps {
  data: ITaskItem;
  onPress?: () => void;
}

const TaskItem = (props: ITaskItemProps) => {
  const { data, onPress } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const _renderLabelTxt = useMemo(() => {
    if (data.status === STATUS_ENUM.COMPLETED) {
      return 'Completed';
    } else {
      return 'To do';
    }
  }, [data.status]);

  const _renderCategoryIcon = useCallback(() => {
    return (
      <Box>
        <Text>{data.iconTypeCategory}</Text>
      </Box>
    );
  }, [data.iconTypeCategory]);

  const _renderStatusLabel = useCallback(() => {
    return (
      <Box style={styles.statusLabel}>
        <Text variants="caption2" color={theme.palette.primary1}>
          {_renderLabelTxt}
        </Text>
      </Box>
    );
  }, [_renderLabelTxt, styles.statusLabel, theme.palette.primary1]);

  return (
    <Pressable onPress={onPress}>
      <Box style={styles.container}>
        <Box style={styles.leftContent}>
          <Text
            variants="body3"
            color={theme.palette.neutral2}
            numberOfLines={1}
          >
            {data?.description}
          </Text>
          <Text variants="title2">{data?.taskName}</Text>
          <Box rowAlignCenter>
            <SvgFromString svg={theme.icons.calendar} />
            <Box marginLeft={scaledSize.moderateScale(8)}>
              <Text
                variants="body2"
                numberOfLines={1}
                color={theme.palette.primary6}
              >
                10:00 AM
              </Text>
            </Box>
          </Box>
        </Box>
        <Box style={styles.rightContent}>
          <Box style={styles.iconCategory}>{_renderCategoryIcon()}</Box>
          {_renderStatusLabel()}
        </Box>
      </Box>
    </Pressable>
  );
};

export default memo(TaskItem);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.palette.neutral6,
      borderRadius: scaledSize.moderateScale(24),
      height: scaledSize.verticalScale(128),
      padding: scaledSize.moderateScale(22),
      flexDirection: 'row',
    },
    leftContent: {
      flex: 8,
      justifyContent: 'space-between',
    },
    rightContent: {
      flex: 2.5,
      justifyContent: 'space-between',
    },
    statusLabel: {
      backgroundColor: theme.palette.primary6,
      borderRadius: Number.MAX_SAFE_INTEGER,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scaledSize.moderateScale(4),
    },
    iconCategory: {
      alignItems: 'flex-end',
    },
  });
