import React, { PropsWithChildren } from 'react';
import { IBox } from './types';
import { ITheme, PlatformProps } from '../../../common/utils';
import usePropsResolutionWithComponentTheme from './use-props-resolution-with-component-theme';
type FactoryComponentProps = PropsWithChildren<IBox & PlatformProps<IBox>>;

export function BoxFactory<P>(
  Component: React.ComponentType<P> | any,
  baseProps?: IBox | ((theme: ITheme) => IBox),
) {
  return React.forwardRef((props: P & FactoryComponentProps, ref: any) => {
    const { blockStyles, restProps, renderChildComponent } =
      usePropsResolutionWithComponentTheme(baseProps, props);

    return (
      <Component style={blockStyles} {...restProps} ref={ref}>
        {renderChildComponent()}
      </Component>
    );
  });
}
