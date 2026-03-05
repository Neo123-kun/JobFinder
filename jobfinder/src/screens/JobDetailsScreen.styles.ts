import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useStyles = () => {
  const { colors } = React.useContext(ThemeContext); 

  return StyleSheet.create({
    container: { padding: 16, flex: 1 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5, color: colors.text },
    company: { fontSize: 18, marginBottom: 5, color: colors.text },
    location: { marginBottom: 5, color: colors.text },
    salary: { marginBottom: 15, color: colors.text },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: colors.text },
    description: { fontSize: 16, color: colors.text },
    button: { marginTop: 20 },
    descriptionText: {
      fontSize: 16,
      lineHeight: 22,
      padding: 20,
      borderRadius: 8,
    },
  });
};