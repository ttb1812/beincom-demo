import React, { memo } from 'react';
import AppStartup from './app-startup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../../app';

const AppSetup = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <I18nextProvider i18n={i18next}>
            <AppStartup />
          </I18nextProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default memo(AppSetup);
