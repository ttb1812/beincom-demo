import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScreenName } from '../../../common/utils';
import { BottomTabNavigator } from './bottom-tab-navigator';
import { AddTaskScreen } from '../../add-task';
import { NotificationsScreen } from '../../notifications';
import { Platform } from 'react-native';

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
      <Stack.Screen
        name={ScreenName.addTaskScreen}
        component={AddTaskScreen}
        options={{
          presentation: Platform.select({
            ios: 'transparentModal',
            android: 'containedTransparentModal',
          }),
          animation: 'slide_from_bottom',
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name={ScreenName.notificationsScreen}
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
};

export default LoggedStack;
