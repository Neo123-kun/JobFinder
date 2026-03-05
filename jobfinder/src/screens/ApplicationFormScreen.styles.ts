import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemeContext } from '../context/ThemeContext';


export const useStyles = () => {
  const { colors } = React.useContext(ThemeContext); 

return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.dgreentext,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
      marginTop: 12,
      marginLeft: 4,
      color: colors.dgreentext,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.oppositetext + '40',
      padding: 10,
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: colors.inputbg,
      color: colors.text,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    error: {
      color: colors.error,
      marginBottom: 8,
    },
    submitButton: {
      backgroundColor: colors.button,
      padding: 14,
      borderRadius: 8,
      marginTop: 10,
    },
    buttonText: {
      color: colors.oppositetext,
      textAlign: 'center',
    },
  })
};