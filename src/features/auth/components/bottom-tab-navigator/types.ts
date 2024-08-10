import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';

export interface TabScreenProps {
  key: string;
  name: string;
  textTranslate?: string;
  type: string;
  iconType?: string;
  icon: string;
  iconSelectedType?: string;
  layouts: any[] | TabScreenProps[];
  status: 'in_development' | 'not_development' | 'released';
}

export interface IBottomTab {
  name: string;
  component: any;
  options?:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, any>;
        navigation: any;
      }) => BottomTabNavigationOptions)
    | undefined;
  tabProps: TabScreenProps;
}

export interface TabProps {
  focused: boolean;
  color: string;
  size: number;
}
