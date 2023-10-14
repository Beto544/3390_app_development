// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import Signup from './screens/Signup';
import HomeScreen from './screens/HomeScreen';
import CreateQuiz from './screens/CreateQuiz';
import CreateFlashcards from './screens/CreateFlashCards';
import TakeQuiz from './screens/TakeQuiz';
import ResultsScreen from './screens/ResultsScreen';
import Community from './screens/Community';
import { View, Text, Button } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

function App() {
  return (
  
    <NavigationContainer>
      {/* Home side menu options */}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="Community" component={Community} />
        <Drawer.Screen name="Create Quiz" component={CreateQuiz} />
        <Drawer.Screen name="Create Flashcards" component={CreateFlashcards} />
        <Drawer.Screen name="Take Quiz" component={TakeQuiz} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
