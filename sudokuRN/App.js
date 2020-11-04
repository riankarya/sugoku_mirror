import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, Game, Finish } from './src/screens'
import { Provider } from 'react-redux'
import store from './src/stores/store'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={ Home } />
          <Stack.Screen name='Game' component={ Game } />
          <Stack.Screen name='Finish' component={ Finish } />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
