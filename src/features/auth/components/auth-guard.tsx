import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthGuardStackName } from '../types';
import LoggedStack from './logged-stack';
// import AuthStack from './auth-stack';

const Stack = createNativeStackNavigator();

const AuthGuard = () => {
  return (
    <Stack.Navigator initialRouteName={AuthGuardStackName.logged}>
      {/* <Stack.Screen
        name={AuthGuardStackName.auth}
        component={AuthStack}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name={AuthGuardStackName.logged}
        component={LoggedStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthGuard;
