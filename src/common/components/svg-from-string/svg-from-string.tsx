import {
  Canvas,
  Fit,
  fitbox,
  Group,
  ImageSVG,
  rect,
  Skia,
} from '@shopify/react-native-skia';
import React, { memo, useMemo } from 'react';
import { ViewStyle } from 'react-native';
export interface SvgFromStringProps {
  svg: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fitType?: Fit;
  scaling?: boolean;
}
const SvgFromString = (props: SvgFromStringProps) => {
  const {
    svg,
    x = 0,
    y = 0,
    width,
    height,
    fitType = 'contain',
    scaling = true,
  } = props;
  const makeSvg = Skia.SVG.MakeFromString(svg)!;
  const src = rect(x, y, makeSvg.width(), makeSvg.height());
  const dst = rect(
    x,
    y,
    !scaling ? makeSvg.width() : (width as number),
    !scaling ? makeSvg.height() : (height as number),
  );
  const defaultStyle = useMemo(() => {
    return {
      width: width,
      height: height,
    } as ViewStyle;
  }, [height, width]);
  return (
    <Canvas style={defaultStyle}>
      <Group transform={fitbox(fitType, src, dst)}>
        <ImageSVG
          svg={makeSvg}
          x={0}
          y={0}
          width={src.width}
          height={src.height}
        />
      </Group>
    </Canvas>
  );
};
export default memo(SvgFromString);
