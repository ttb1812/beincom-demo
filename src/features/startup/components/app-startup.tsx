import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import React, { memo } from 'react';
import { navigationRef, withTheme } from '../../../common/utils';
import { AuthGuard } from '../../auth';

const ApplicationNavigator = memo(() => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthGuard />
    </NavigationContainer>
  );
});

const AppStartup = () => {
  const theme = extendTheme({
    ...withTheme('light'),
  });
  return (
    <NativeBaseProvider theme={theme}>
      <ApplicationNavigator />
    </NativeBaseProvider>
  );
};

export default memo(AppStartup);
