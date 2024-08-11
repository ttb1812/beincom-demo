import { FastImageProps } from 'react-native-fast-image';

export interface ImageProps extends FastImageProps {
  width?: number | undefined;
  height?: number | undefined;
  ratio?: ImageRatios;
  thumbnail?: ImageProps['source'];
  showImageFullScreen?: boolean;
  rounded?: boolean;
  showSkeletonLoading?: boolean;
}

export const ImageRatios = {
  oneToOne: 'oneToOne',
  fourToThree: 'fourToThree',
  sixteenToNine: 'sixteenToNine',
  sixteenToTen: 'sixteenToTen',
  none: 'none',
};

export type ImageRatios = keyof typeof ImageRatios;
