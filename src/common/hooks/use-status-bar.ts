import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';

const useStatusBar = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);
  return {};
};

export default useStatusBar;
