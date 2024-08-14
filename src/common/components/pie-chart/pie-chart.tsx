import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Box } from '../box';
import { scaledSize, useAppTheme } from '../../utils';
import { Text } from '../text';
import { TextVariants } from '../text/types';

interface IPieChartViewProps {
  innerCircleColor?: string;
  radius?: number;
  innerRadius?: number;
  percentTextColor?: string;
  variants?: TextVariants;
}
const PieChartView = (props: IPieChartViewProps) => {
  const theme = useAppTheme();
  const {
    innerCircleColor,
    radius = scaledSize.moderateScale(100),
    innerRadius,
    percentTextColor = theme.palette.neutral6,
    variants = 'title3',
  } = props;
  const data = [
    { value: 1, color: theme.palette.primary2 },
    { value: 10, color: theme.palette.primary6 },
  ];
  return (
    <Box style={styles.container}>
      <PieChart
        data={data}
        donut
        radius={radius}
        innerRadius={innerRadius}
        innerCircleColor={innerCircleColor}
      />
      <Box style={styles.overlay}>
        <Text color={percentTextColor} variants={variants}>
          85%
        </Text>
      </Box>
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
