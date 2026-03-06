import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { fetchJobs } from '../services/jobService';
import { Job } from '../types/job';
import { useJobContext } from '../context/JobContext';
import { RootStackParamList } from '../navigation/navigationTypes';
import { createStyles } from './JobFinderScreen.styles';
import { ThemeContext } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function JobFinderScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addJob, isSaved } = useJobContext();
  const { colors } = useContext(ThemeContext);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const styles = createStyles(colors);

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
    return jobs.filter(
      job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [jobs, search]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}> 
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }] }>
      <TextInput
        placeholder="Search jobs..."
        value={search}
        onChangeText={setSearch}
        style={[styles.searchInput, { borderColor: colors.button, color: colors.text, backgroundColor: colors.card }]}
      />

      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const saved = isSaved(item.id);

            return (
              <TouchableOpacity
                style={[styles.card, { backgroundColor: colors.cardbg }]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('JobDetails', { job: item })}
              >
              
              <View style={styles.bgCircleOuter} />
              <View style={styles.bgCircleInner} />

              <Text style={[styles.title, { color: colors.oppositetext }]}>{item.title}</Text>
              <Text style={{ color: colors.oppositetext }}>Company: {item.company}</Text>
              <View style={{ marginTop: 8 }}>
                <Text style={{ color: colors.oppositetext, fontSize: 12 }}>
                  {item.minSalary ?? ''} - {item.maxSalary ?? ''} {item.currency ?? ''}
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    saved && styles.savedButton,
                    { backgroundColor: saved ? colors.buttonSelected : colors.button }
                  ]}
                  onPress={() => addJob(item)}
                  disabled={saved}
                >
                  <Text style={styles.buttonText}>
                    {saved ? 'Saved' : 'Save Job'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.applyButton, { backgroundColor: colors.buttonV2 }]}
                  onPress={() =>
                    navigation.navigate('ApplicationForm', {
                      jobId: item.id,
                      jobData: item, 
                      fromSaved: false,
                    })
                  }
                >
                  <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Apply</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}