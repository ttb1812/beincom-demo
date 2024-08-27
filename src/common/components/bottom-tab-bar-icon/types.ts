export interface TabProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface BottomTabBarIconProps {
  tabKey: string;
  label: string;
  tabProps: TabProps;
}
