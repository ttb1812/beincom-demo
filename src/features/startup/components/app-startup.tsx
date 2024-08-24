import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import React, { memo } from 'react';
import { GlobalPopupID, PopupProvider } from '../../../common/components';
import { useNotification, useStatusBar } from '../../../common/hooks';
import { navigationRef, withTheme } from '../../../common/utils';
import { AuthGuard } from '../../auth';
import useStartUp from '../use-start-up';

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

  useNotification();
  useStatusBar();

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
