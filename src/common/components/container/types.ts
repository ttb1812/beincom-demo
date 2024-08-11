import React, { ComponentType, ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { IHeaderProps } from '../header/types';

export interface IContainerProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  headerComponent?: ComponentType<any> | ReactElement | null | undefined;
  headerProps?: IHeaderProps;
}
