import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { useJobContext } from '../context/JobContext';
import { RootStackParamList } from '../navigation/navigationTypes';
import { ThemeContext } from '../context/ThemeContext';
import { createStyles } from './SavedJobsScreen.styles'; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ApplicationForm'>;

export default function SavedJobsScreen() {
  const { savedJobs, removeJob } = useJobContext();
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  const stripes = Array.from({ length: 18 });

  if (savedJobs.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>No saved jobs yet.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.stripesContainer} pointerEvents="none">
              {stripes.map((_, index) => (
                <View key={index} style={styles.stripe} />
              ))}
            </View>
            <Text style={[styles.title, { color: colors.oppositetext }]}>{item.title}</Text>
            <Text style={{ color: colors.oppositetext, opacity: 0.9 }}>{item.company}</Text>
            <Text style={{ color: colors.oppositetext, opacity: 0.8, fontSize: 13 }}>{item.salary}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeJob(item.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.applyButton, { backgroundColor: colors.button }]}
                onPress={() =>
                  navigation.navigate('ApplicationForm', {
                    jobId: item.id,
                    fromSaved: true,
                  })
                }
              >
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}