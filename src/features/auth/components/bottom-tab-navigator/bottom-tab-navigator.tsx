import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { memo, useCallback, useMemo } from 'react';
import { ScreenName } from '../../../../common/utils';
import { CalendarScreen } from '../../../calendar';
import { HomeScreen } from '../../../home';
import { ProfileScreen } from '../../../profile';
import { TasksScreen } from '../../../tasks';
import { IBottomTab } from './types';
import { BottomTabBar } from '../../../../common/components';

const Tab = createBottomTabNavigator();

const TABS = [
  {
    key: ScreenName.homeScreen,
    textTranslate: 'Home',
  },
  {
    key: ScreenName.calendarScreen,
    textTranslate: 'Calendar',
  },
  {
    key: ScreenName.addTaskBtn,
    textTranslate: 'Add',
  },
  {
    key: ScreenName.tasksScreen,
    textTranslate: 'Tasks',
  },
  {
    key: ScreenName.profileScreen,
    textTranslate: 'Profile',
  },
];

const BottomTabNavigator = () => {
  const getComponent = useCallback((key: string) => {
    switch (key) {
      case ScreenName.calendarScreen:
        return CalendarScreen;
      case ScreenName.tasksScreen:
        return TasksScreen;
      case ScreenName.profileScreen:
        return ProfileScreen;
      default:
        return HomeScreen;
    }
  }, []);

  const tabs = useMemo((): IBottomTab[] => {
    const formattedTabs: IBottomTab[] = TABS.map(tabItem => {
      return {
        name: tabItem.key,
        options: {
          headerShown: false,
          title: tabItem.textTranslate,
        },
        component: getComponent(tabItem.key),
        tabProps: tabItem,
      } as IBottomTab;
    });
    return formattedTabs || [];
  }, [getComponent]);

  return (
    <Tab.Navigator
      initialRouteName={ScreenName.homeScreen}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => {
        return <BottomTabBar {...props} />;
      }}
    >
      {tabs?.map(tabItem => {
        const TabScreen = tabItem.component;
        return (
          <Tab.Screen
            name={tabItem.name}
            key={tabItem.name}
            options={{ ...tabItem.options }}
          >
            {(tabProps: any) => <TabScreen {...tabProps} />}
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

export default memo(BottomTabNavigator);
