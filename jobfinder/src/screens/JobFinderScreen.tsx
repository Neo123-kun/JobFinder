import React, { useEffect, useState, useMemo, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { fetchJobs } from '../services/jobService';
import { Job } from '../types/job';
import { useJobContext } from '../context/JobContext';
import { RootStackParamList } from '../navigation/navigationTypes';
import { styles } from './JobFinderScreen.styles';
import { ThemeContext } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ApplicationForm'
>;

export default function JobFinderScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addJob, isSaved } = useJobContext();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [jobs, search]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search jobs..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* Job List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const saved = isSaved(item.id);

          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.company}</Text>
              <Text>{item.salary}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    saved && styles.savedButton,
                  ]}
                  onPress={() => addJob(item)}
                  disabled={saved}
                >
                  <Text style={styles.buttonText}>
                    {saved ? 'Saved' : 'Save Job'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() =>
                    navigation.navigate('ApplicationForm', {
                      jobId: item.id,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}