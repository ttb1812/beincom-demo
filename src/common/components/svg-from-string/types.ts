import { Fit } from '@shopify/react-native-skia';

export interface SvgFromStringProps {
  svg: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fitType?: Fit;
  scaling?: boolean;
}
