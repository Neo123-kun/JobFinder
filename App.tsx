import React, { useContext } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { JobProvider } from './src/context/JobContext';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <JobProvider>
        <AppContent/>
      </JobProvider>
    </ThemeProvider>
  );
}