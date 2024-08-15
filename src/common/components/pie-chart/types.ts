import { pieDataItem } from 'react-native-gifted-charts';
import { TextVariants } from '../text/types';

export interface IPieChartViewProps {
  innerCircleColor?: string;
  radius?: number;
  innerRadius?: number;
  percentTextColor?: string;
  variants?: TextVariants;
  dataChart: pieDataItem[];
  percent: number | string;
  showPercent?: boolean;
}
