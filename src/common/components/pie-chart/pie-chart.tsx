import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';
import { Text } from '../text';
import { IPieChartViewProps } from './types';

const PieChartView = (props: IPieChartViewProps) => {
  const theme = useAppTheme();
  const {
    innerCircleColor,
    radius = scaledSize.moderateScale(100),
    innerRadius,
    percentTextColor = theme.palette.neutral6,
    variants = 'title3',
    dataChart,
    percent = 0,
    showPercent = true,
  } = props;
  return (
    <Box style={styles.container}>
      <PieChart
        data={dataChart}
        donut
        radius={radius}
        innerRadius={innerRadius}
        innerCircleColor={innerCircleColor}
        isAnimated={true}
        animationDuration={200}
      />
      {showPercent && (
        <Box style={styles.overlay}>
          <Text color={percentTextColor} variants={variants}>
            {`${percent}%`}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default memo(PieChartView);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
  },
});
