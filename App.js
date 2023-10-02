import React from 'react';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Main from './screens/Main';


import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
    <Stack.Screen name = "Login" component={Login} />
    <Stack.Screen name = "Signup" component={Signup} />
    <Stack.Screen name = "Main" component={Main} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
    <App />
    </NavigationContainer>
  )
}