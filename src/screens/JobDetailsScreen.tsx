import React, { useContext } from 'react';
import { FlatList, Text, View, Button, useWindowDimensions, Touchable, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RenderHTML from 'react-native-render-html';
import { useStyles } from './JobDetailsScreen.styles';
import { ThemeContext } from '../context/ThemeContext';
import { useJobContext } from '../context/JobContext';

type JobDetailsRouteProp = RouteProp<RootStackParamList, 'JobDetails'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function JobDetailsScreen() {
  const route = useRoute<JobDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { job } = route.params;
  const { width } = useWindowDimensions();
  const { colors } = useContext(ThemeContext);
  const styles = useStyles();
  const { addJob, isSaved, appliedJobs } = useJobContext();

  const alreadySaved = isSaved(job.id);
  const alreadyApplied = appliedJobs.some(entry => entry.job.id === job.id);

  const locations =
    Array.isArray(job.locations) && job.locations.length > 0
      ? job.locations.join(', ')
      : job.locations || 'Not specified';

  const data = [job];

  const renderContent = () => (
    <View style={{ paddingBottom: 40 }}> 
      <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
      <Text style={[styles.company, { color: colors.text }]}>Company: {job.company}</Text>
      <Text style={[styles.location, { color: colors.text }]}>Location: {locations}</Text>
      <Text style={[styles.salary, { color: colors.text }]}>
        {job.minSalary ?? ''} - {job.maxSalary ?? ''} {job.currency ?? ''}
      </Text>

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>Description</Text>
      
      <RenderHTML 
        contentWidth={width} 
        source={{ html: job.description || '' }} 
        baseStyle={{ color: colors.text }} 
      />

      <View style={[styles.button, { marginTop: 30 }]}>
        {/* Save or Saved Button */}
        <TouchableOpacity
          style={{ 
            backgroundColor: alreadySaved ? colors.buttonSelected : colors.button,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => {
            if (!alreadySaved) addJob(job);
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
            {alreadySaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.button, { marginTop: 16 }]}>
        {/* Apply Now Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.button,
            padding: 10,
            borderRadius: 5,
            opacity: 1
          }}
          onPress={() =>
            navigation.navigate('ApplicationForm', { 
              jobId: job.id,
              jobData: job,
              fromSaved: false
            })
          }
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
            {'Apply Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderContent}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}