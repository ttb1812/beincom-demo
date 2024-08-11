import { PropsWithChildren } from 'react';
import {
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

export interface IContent
  extends PropsWithChildren,
    KeyboardAwareScrollViewProps {
  getAwareScrollView?: (ref: KeyboardAwareScrollView | null) => void;
}
