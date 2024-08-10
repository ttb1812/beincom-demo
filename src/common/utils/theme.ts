import { useTheme } from 'native-base';
import { ITheme, darkTheme, lightTheme } from '../../content';
export * from '../../content';

export const useAppTheme = () => {
  return useTheme() as unknown as ITheme;
};
export const withTheme = (mode: 'dark' | 'light' = 'light') =>
  mode === 'dark' ? darkTheme : lightTheme;
