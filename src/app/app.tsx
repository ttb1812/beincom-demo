import React, { memo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppSetup } from '../features/startup';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppSetup />
    </SafeAreaProvider>
  );
};

export default memo(App);
