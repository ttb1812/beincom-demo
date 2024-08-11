import React from 'react';

export interface IHeaderProps {
  title?: string;
  numberOfLines?: number;
  showBackButton?: boolean;
  onBackButtonPress?: () => void;
  rightButtonComponent?: React.ReactNode;
}
