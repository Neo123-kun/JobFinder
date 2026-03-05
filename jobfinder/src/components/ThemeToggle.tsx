import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons'; 


export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { colors } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.button} activeOpacity={0.7}>
      <Ionicons 
        name={theme === 'light' ? 'moon' : 'sunny'} 
        size={24} 
        color={theme === 'light' ? colors.buttonNotActive : colors.button} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
    padding: 6,
    borderRadius: 20,
  },
});