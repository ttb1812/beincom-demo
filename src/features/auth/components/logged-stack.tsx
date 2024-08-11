import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScreenName } from '../../../common/utils';
import { AddTaskScreen } from '../../add-task';
import { NotificationsScreen } from '../../notifications';
import { BottomTabNavigator } from './bottom-tab-navigator';

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
    </Stack.Navigator>
  );
};

export default LoggedStack;
