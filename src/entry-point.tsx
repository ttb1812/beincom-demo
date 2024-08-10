import React, { memo } from 'react';
import App from './app/app';
import './common/injection';

const EntryPoint = () => {
  return <App />;
};

export default memo(EntryPoint);
