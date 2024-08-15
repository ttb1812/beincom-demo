import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import React, { memo, useEffect } from 'react';
import { navigationRef, withTheme } from '../../../common/utils';
import { AuthGuard } from '../../auth';
import { Platform, StatusBar } from 'react-native';
import { PortalProvider } from '@gorhom/portal';
import useStartUp from '../use-start-up';
import { GlobalPopupID, PopupProvider } from '../../../common/components';

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
  const { isReadyRenderUI } = useStartUp();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  if (!isReadyRenderUI) {
    return null;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <PortalProvider>
        <ApplicationNavigator />
        <PopupProvider popupId={GlobalPopupID} />
      </PortalProvider>
    </NativeBaseProvider>
  );
};

export default memo(AppStartup);
