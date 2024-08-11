import { PropsWithChildren } from 'react';
import { IBox } from '../box/types';

export interface IFooter extends PropsWithChildren, Omit<IBox, 'children'> {
  keyboardVerticalOffsetExtra?: number;
}
