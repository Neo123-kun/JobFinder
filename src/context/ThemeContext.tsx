import React, { createContext, useState, ReactNode } from 'react';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    cardbg: string;
    inputbg: string;
    text: string;
    card: string;
    button: string;
    buttonV2: string;
    buttonNotActive: string;
    buttonSelected: string;
    subcolor: string;
    headerbg: string;
    oppositetext: string;
    dgreentext: string;
    error: string;
    
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

  const colors: ThemeContextType['colors'] =
    theme === 'light'
      ? {
          background: '#a7e7b8',
          cardbg: '#4E9F70',
          inputbg: '#ffffff',

          subcolor: '#ffffff',
          
          card: '#f2f2f2',
          
          button: '#25eb9c',
          buttonV2: '#1fbfff',
          buttonSelected: '#135819',
          buttonNotActive: '#62e0ff',

          headerbg: '#08949e',

          oppositetext: '#ffffff',
          text: '#000000',
          dgreentext: '#06464b', 

          error: '#ff4d4d',
        }

      : {
          background: '#253c2b',
          cardbg: '#216a3f',
          inputbg: '#cdcdcd',

          subcolor: '#b4b4b4',
          
          card: '#a4a4a4',
          
          button: '#26bd80',
          buttonV2: '#1d8cb8',
          buttonSelected: '#2fc93c',
          buttonNotActive: '#73aefc',

          headerbg: '#06464b',

          oppositetext: '#ffffff',
          text: '#ffffff',
          dgreentext: '#21e5aa', 

          error: '#ff4d4d',


        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};