import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, IconButton, Text } from '../../../common/components';
import {
  ITheme,
  NavigationService,
  scaledSize,
  ScreenName,
  useAppTheme,
} from '../../../common/utils';

const TodayTask = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const _renderViewTaskBtn = useCallback(() => {
    return (
      <Pressable
        style={styles.viewTaskBtn}
        onPress={() => NavigationService.navigate(ScreenName.calendarScreen)}
      >
        <Text variants="caption1" color={theme.palette.primary1}>
          View Task
        </Text>
      </Pressable>
    );
  }, [styles.viewTaskBtn, theme.palette.primary1]);

  const _renderPieChart = useCallback(() => {
    return (
      <Box flex center>
        <Box
          radius="full"
          backgroundColor="green"
          width={100}
          height={100}
          center
        >
          <Text>Pie</Text>
        </Box>
      </Box>
    );
  }, []);

  return (
    <Box style={styles.container}>
      <Box flex={4} justifyContent="space-between">
        <Box>
          <Text style={styles.label} variants="body3">
            Your today's task almost done!
          </Text>
        </Box>
        <Box>{_renderViewTaskBtn()}</Box>
      </Box>
      <Box flex={6} row justifyContent="space-between">
        {_renderPieChart()}
        <Box style={styles.optionBtn}>
          <IconButton svg={theme.icons.more} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(TodayTask);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.palette.primary1,
      minHeight: scaledSize.verticalScale(160),
      padding: scaledSize.moderateScale(22),
      borderRadius: scaledSize.moderateScale(24),
      flexDirection: 'row',
      marginHorizontal: scaledSize.moderateScale(22),
    },
    viewTaskBtn: {
      backgroundColor: theme.palette.primary6,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scaledSize.moderateScale(8),
      height: scaledSize.verticalScale(36),
      width: scaledSize.scale(100),
    },
    viewTaskTxt: {
      color: theme.palette.primary1,
    },
    label: {
      color: theme.palette.neutral6,
    },
    optionBtn: {
      top: scaledSize.moderateScale(-16),
      right: scaledSize.moderateScale(-16),
    },
  });
