/**
 * Simple React Native ToDo App
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './src/screens/Dashboard';
import Todo from './src/screens/CreateTask';
import {enGB, registerTranslation} from 'react-native-paper-dates';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
registerTranslation('en', enGB);

export default function App() {
  const NativeStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{headerShown: false}}>
        <NativeStack.Screen name="Login" component={LoginScreen} />
        <NativeStack.Screen name="Register" component={RegisterScreen} />
        <NativeStack.Screen name="Dashboard" component={Dashboard} />
        <NativeStack.Screen name="Todo" component={Todo} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
