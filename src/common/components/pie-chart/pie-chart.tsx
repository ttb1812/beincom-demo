import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Box } from '../box';
import { scaledSize } from '../../utils';

interface IPieChartViewProps {
  innerCircleColor?: string;
  radius?: number;
  innerRadius?: number;
}
const PieChartView = (props: IPieChartViewProps) => {
  const {
    innerCircleColor,
    radius = scaledSize.moderateScale(100),
    innerRadius,
  } = props;
  const data = [{ value: 1 }, { value: 10 }];
  return (
    <Box>
      <PieChart
        data={data}
        donut
        radius={radius}
        innerRadius={innerRadius}
        innerCircleColor={innerCircleColor}
      />
    </Box>
  );
};

export default memo(PieChartView);

const styles = StyleSheet.create({});
