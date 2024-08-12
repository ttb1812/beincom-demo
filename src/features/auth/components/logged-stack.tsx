import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScreenName } from '../../../common/utils';
import { AddTaskScreen } from '../../add-task';
import { NotificationsScreen } from '../../notifications';
import { BottomTabNavigator } from './bottom-tab-navigator';
import { ManageCategoryScreen } from '../../manage-category';
import { ThemeScreen } from '../../theme';

const Stack = createNativeStackNavigator();

const LoggedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ScreenName.bottomTabNavigator}
    >
      <Stack.Screen
        name={ScreenName.bottomTabNavigator}
        component={BottomTabNavigator}
      />
      <Stack.Screen name={ScreenName.addTaskScreen} component={AddTaskScreen} />
      <Stack.Screen
        name={ScreenName.notificationsScreen}
        component={NotificationsScreen}
      />
      <Stack.Screen
        name={ScreenName.manageCategoryScreen}
        component={ManageCategoryScreen}
      />
      <Stack.Screen name={ScreenName.themeScreen} component={ThemeScreen} />
    </Stack.Navigator>
  );
};

export default LoggedStack;
