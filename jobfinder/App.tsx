import RootNavigator from './src/navigation/RootNavigator';
import { JobProvider } from './src/context/JobContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <JobProvider>
        <RootNavigator />
      </JobProvider>
    </ThemeProvider>
  );
}