import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {
  Box,
  IconCategory,
  SvgFromString,
  Text,
} from '../../../common/components';
import {
  ITheme,
  scaledSize,
  translate,
  useAppTheme,
} from '../../../common/utils';
import { ITaskItem, STATUS_ENUM } from '../../manage-category/types';
import Color from 'color';
interface ITaskItemProps {
  data: ITaskItem;
  onPress?: () => void;
}

const TaskItem = (props: ITaskItemProps) => {
  const { data, onPress } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const statusLabel = useMemo(() => {
    if (data.status === STATUS_ENUM.COMPLETED) {
      return { title: translate('completed'), color: theme.palette.neutral2 };
    } else {
      return { title: translate('todo'), color: theme.palette.primary6 };
    }
  }, [data.status, theme.palette.neutral2, theme.palette.primary6]);

  const _renderCategoryIcon = useCallback(() => {
    return <IconCategory type={data.iconTypeCategory ?? ''} />;
  }, [data.iconTypeCategory]);

  const _renderStatusLabel = useCallback(() => {
    return (
      <Box
        style={styles.statusLabel}
        backgroundColor={Color(statusLabel.color).alpha(0.2).rgb().toString()}
      >
        <Text variants="caption2" color={statusLabel.color}>
          {statusLabel.title}
        </Text>
      </Box>
    );
  }, [statusLabel, styles.statusLabel]);

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
          <Text variants="title2" numberOfLines={1}>
            {data?.taskName}
          </Text>
          <Box rowAlignCenter>
            <SvgFromString svg={theme.icons.clock} />
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
      borderRadius: Number.MAX_SAFE_INTEGER,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scaledSize.moderateScale(4),
    },
    iconCategory: {
      alignItems: 'flex-end',
    },
  });
