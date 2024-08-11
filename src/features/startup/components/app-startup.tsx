import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import React, { memo, useEffect } from 'react';
import { navigationRef, withTheme } from '../../../common/utils';
import { AuthGuard } from '../../auth';
import { Platform, StatusBar } from 'react-native';

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
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);
  return (
    <NativeBaseProvider theme={theme}>
      <ApplicationNavigator />
    </NativeBaseProvider>
  );
};

export default memo(AppStartup);
