import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { useJobContext } from '../context/JobContext';
import { RootStackParamList } from '../navigation/navigationTypes';
import { styles } from './SavedJobsScreen.styles';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ApplicationForm'
>;

export default function SavedJobsScreen() {
  const { savedJobs, removeJob } = useJobContext();
  const navigation = useNavigation<NavigationProp>();

  if (savedJobs.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No saved jobs yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.company}</Text>
            <Text>{item.salary}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeJob(item.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
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