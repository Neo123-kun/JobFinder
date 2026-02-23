import React, { createContext, useState, ReactNode } from 'react';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    card: string;
    button: string;
  };
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<Theme>(
    systemTheme === 'dark' ? 'dark' : 'light'
  );

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors =
    theme === 'light'
      ? {
          background: '#ffffff',
          text: '#000000',
          card: '#f2f2f2',
          button: '#2563eb',
        }
      : {
          background: '#121212',
          text: '#ffffff',
          card: '#1e1e1e',
          button: '#3b82f6',
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};