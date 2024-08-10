import * as React from 'react';
import {
  NavigationContainerRef,
  NavigationProp,
} from '@react-navigation/native';
import { ScreenName } from './constants';

interface RefObject<T> {
  current: T | null;
}
export type RootStackParamList = Record<keyof typeof ScreenName, any>;

export type StackNavigation = NavigationProp<RootStackParamList>;

export const navigationRef = React.createRef<NavigationContainerRef<{}>>();

export const routeNameRef: RefObject<string> = React.createRef<string | null>();
function navigate(name: keyof typeof ScreenName, params?: any) {
  const navigation: StackNavigation =
    navigationRef.current as unknown as StackNavigation;
  navigation?.navigate<any>(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

export const NavigationService = {
  navigate,
  goBack,
};
