import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, Text, PieChart } from '../../../common/components';
import {
  ITheme,
  NavigationService,
  scaledSize,
  ScreenName,
  translate,
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
          {translate('home.viewTask')}
        </Text>
      </Pressable>
    );
  }, [styles.viewTaskBtn, theme.palette.primary1]);

  const _renderPieChart = useCallback(() => {
    return (
      <Box flex center>
        <Box>
          <PieChart
            dataChart={[
              { value: 10, color: theme.palette.primary2 },
              { value: 0, color: theme.palette.primary6 },
            ]}
            radius={scaledSize.scale(50)}
            innerRadius={scaledSize.scale(38)}
            innerCircleColor={theme.palette.primary1}
            percent={0}
          />
        </Box>
      </Box>
    );
  }, [theme.palette.primary1, theme.palette.primary2, theme.palette.primary6]);

  return (
    <Box style={styles.container}>
      <Box flex={4} justifyContent="space-between">
        <Box>
          <Text style={styles.label} variants="body3">
            {translate('home.yourTodayTaskAlmostDone')}
          </Text>
        </Box>
        <Box>{_renderViewTaskBtn()}</Box>
      </Box>
      <Box flex={6} justifyContent="space-between">
        {_renderPieChart()}
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
