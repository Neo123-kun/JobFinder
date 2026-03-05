import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useJobContext } from '../context/JobContext';
import { createStyles } from './JobFinderScreen.styles';
import { ThemeContext } from '../context/ThemeContext';

export default function AppliedJobsScreen() {
  const { appliedJobs } = useJobContext();
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  if (appliedJobs.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>No applied jobs yet.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={appliedJobs}
        //  Check for the key
        keyExtractor={(item) => item?.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => {
          
          if (!item) return null;

          const job = item.job;

          const locations = Array.isArray(job?.locations)
            ? job.locations.join(', ')
            : job?.locations ?? 'Not specified';

          return (
            <View style={[styles.card, { backgroundColor: colors.cardbg || colors.card }]}>
              <View style={styles.stripesContainer} pointerEvents="none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <View key={i} style={styles.stripe} />
                ))}
              </View>

              {/* --- JOB INFORMATION --- */}
              <Text style={[styles.title, { color: colors.oppositetext || '#fff' }]}>
                {job?.title ?? 'Unknown Position'}
              </Text>
              
              <Text style={{ color: colors.oppositetext || '#fff', fontWeight: '600' }}>
                {job?.company ?? 'Unknown Company'}
              </Text>
              
              <Text style={{ color: colors.oppositetext || '#fff', opacity: 0.8, fontSize: 13, marginTop: 4 }}>
                Locations: {locations}
              </Text>

              {/* --- APPLICATION DETAILS --- */}
              <View style={{ 
                marginTop: 12, 
                paddingTop: 8, 
                borderTopWidth: 1, 
                borderTopColor: 'rgba(255,255,255,0.1)' 
              }}>
                <Text style={{ color: colors.oppositetext || '#fff', fontSize: 12 }}>
                  Applicant: <Text style={{ fontWeight: 'bold' }}>{item?.applicantName ?? 'Guest'}</Text>
                </Text>
                
                <Text style={{ color: colors.oppositetext || '#fff', fontSize: 11, opacity: 0.6, marginTop: 2 }}>
                  Applied: {item?.appliedAt 
                    ? new Date(item.appliedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                    : 'Date Unknown'}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}