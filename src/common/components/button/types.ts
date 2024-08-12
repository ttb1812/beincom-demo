import { TextStyle, ViewStyle } from 'react-native';
import { TextVariants } from '../text/types';

export interface IButtonProps {
  text?: string;
  textColor?: string;
  onPress?: () => void;
  textVariants?: TextVariants;
  style?: ViewStyle;
  styleTxt?: TextStyle;
}
