import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarIcon } from '../../../../common/components';
import {
  NavigationService,
  scaledSize,
  ScreenName,
  translate,
} from '../../../../common/utils';
import { CalendarScreen } from '../../../calendar';
import { HomeScreen } from '../../../home';
import { ProfileScreen } from '../../../profile';
import { TasksScreen } from '../../../tasks';
import { IBottomTab } from './types';

const Tab = createBottomTabNavigator();

const TABS = [
  {
    key: ScreenName.homeScreen,
    textTranslate: 'bottomTab.home',
  },
  {
    key: ScreenName.calendarScreen,
    textTranslate: 'bottomTab.calendar',
  },
  {
    key: ScreenName.addTaskBtn,
    textTranslate: 'Add',
  },
  {
    key: ScreenName.tasksScreen,
    textTranslate: 'bottomTab.tasks',
  },
  {
    key: ScreenName.profileScreen,
    textTranslate: 'bottomTab.profile',
  },
];

const BottomTabNavigator = () => {
  const { i18n } = useTranslation();
  const insets = useSafeAreaInsets();
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
    const formattedTabs: IBottomTab[] = TABS.map((tabItem, index) => {
      return {
        name: tabItem.key,
        options: {
          headerShown: false,
          title: translate(tabItem.textTranslate),
          tabBarIcon: props => (
            <BottomTabBarIcon
              key={index}
              tabKey={tabItem.key}
              label={translate(tabItem.textTranslate)}
              tabProps={{ ...props }}
            />
          ),
        },
        component: getComponent(tabItem.key),
        tabProps: tabItem,
      } as IBottomTab;
    });
    return formattedTabs || [];
  }, [getComponent]);

  return (
    <Tab.Navigator
      key={i18n.language}
      initialRouteName={ScreenName.homeScreen}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}
      safeAreaInsets={{
        bottom:
          insets.bottom +
          (Platform.select({
            ios: scaledSize.moderateScale(8),
            android: scaledSize.moderateScale(20),
          }) as number),
      }}
    >
      {tabs?.map(tabItem => {
        const TabScreen = tabItem.component;
        return (
          <Tab.Screen
            name={tabItem.name}
            key={tabItem.name}
            options={{ ...tabItem.options }}
            listeners={{
              tabPress: e => {
                if (tabItem.name !== ScreenName.addTaskBtn) {
                  NavigationService.navigate(
                    tabItem.name as keyof typeof ScreenName,
                  );
                } else {
                  e.preventDefault();
                  NavigationService.navigate(ScreenName.addTaskScreen);
                }
              },
            }}
          >
            {(tabProps: any) => <TabScreen {...tabProps} />}
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

export default memo(BottomTabNavigator);
