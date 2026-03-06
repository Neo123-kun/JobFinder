import React, { useContext } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StatusBar as RNStatusBar } from 'react-native';

import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';
import AppliedJobsScreen from '../screens/AppliedJobsScreen';
import { ThemeContext } from '../context/ThemeContext';
import { RootStackParamList } from '../navigation/navigationTypes';
import ThemeToggle from '../components/ThemeToggle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  const { colors } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerbg,
        },
        tabBarStyle: {
          backgroundColor: colors.headerbg,
          borderTopWidth: 0,
          elevation: 0,
        },
        headerTintColor: colors.oppositetext,
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        tabBarActiveTintColor: colors.button,
        tabBarInactiveTintColor: colors.buttonNotActive,
      }}
    >
      <Tab.Screen
        name="Jobs"
        component={JobFinderScreen}
        options={{
          title: 'Lets find a job!',
          tabBarLabel: 'Find Jobs',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          title: 'Saved Jobs',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tab.Screen
        name="AppliedJobs"
        component={AppliedJobsScreen}
        options={{
          title: 'Applied',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="checkmark-done-circle" size={size} color={color} />
          ),
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { theme, colors } = useContext(ThemeContext);

  // calculate top padding for Android status bar
  const statusBarHeight = Platform.OS === 'android' ? RNStatusBar.currentHeight ?? 0 : 0;

  return (
    <SafeAreaProvider>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.headerbg,
            },
            headerTintColor: colors.oppositetext,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="HomeTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JobDetails"
            component={JobDetailsScreen}
            options={{
              title: 'Job Details',
              headerStyle: {
                backgroundColor: colors.headerbg,
                paddingTop: statusBarHeight,
                height: 60 + statusBarHeight,
              },
            }}
          />
          <Stack.Screen
            name="ApplicationForm"
            component={ApplicationFormScreen}
            options={{
              title: 'Apply for Job',
              headerStyle: {
                backgroundColor: colors.headerbg,
                paddingTop: statusBarHeight,
                height: 60 + statusBarHeight,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}