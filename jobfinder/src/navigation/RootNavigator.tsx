import React, { useContext } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <NavigationContainer
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme}>
              <Text style={{ fontSize: 18 }}>
                {theme === 'light' ? '🌙' : '☀️'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="Jobs" component={JobFinderScreen} />
        <Stack.Screen name="Saved" component={SavedJobsScreen} />
        <Stack.Screen name="ApplicationForm" component={ApplicationFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}