import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/navigationTypes';
import { useJobContext } from '../context/JobContext';
import { useStyles } from './ApplicationFormScreen.styles';
import { ThemeContext } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ApplicationForm'>;
type RouteProps = RouteProp<RootStackParamList, 'ApplicationForm'>;

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|yahoo\.com\.ph|outlook\.com|hotmail\.com|icloud\.com|proton\.me)$/i,
      'Please use a standard email provider (Gmail, Yahoo, etc.)'
    )
    .required('Email is required'),
  contact: Yup.string().matches(/^[0-9]+$/, 'Contact must be numbers only').required('Contact number is required'),
  reason: Yup.string().min(10, 'Minimum 10 characters').required('This field is required'),
});

export default function ApplicationFormScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const { fromSaved, jobId, jobData } = route.params; 
  const { applyJob, savedJobs } = useJobContext();

  const jobToApply = jobData || savedJobs.find(j => j.id === jobId) || { 
    id: jobId, 
    title: 'Applied Job', 
    company: 'Unknown',
    locations: 'Not specified' 
  };

  const styles = useStyles();
  const { colors } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.dgreentext }]}>Job Application</Text>
      
      {/* Job Brief Header */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ color: colors.dgreentext, fontSize: 21, fontWeight: 'bold' }}>{jobToApply.title}</Text>
        <Text style={{ color: colors.dgreentext, opacity: 0.7 }}>{jobToApply.company}</Text>
      </View>

      {/* Just a simple line */}
      <View 
        style={{ 
          height: 3, 
          backgroundColor: colors.dgreentext, 
          opacity: 0.2, 
          marginBottom: 20 
        }} 
      />

      <Formik
        initialValues={{ name: '', email: '', contact: '', reason: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          applyJob(jobToApply, {
            name: values.name,
            email: values.email,
            contact: values.contact,
            reason: values.reason,
          });

          Alert.alert(
            'Application Submitted',
            'Your application has been sent successfully!',
            [
              {
                text: 'Okay',
                onPress: () => {
                  resetForm();
                  if (fromSaved) {
                    navigation.navigate('HomeTabs');
                  } else {
                    navigation.goBack();
                  }
                },
              },
            ]
          );
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ paddingBottom: 40 }}>
            
            {/* Full Name Section */}
            <Text style={[styles.label, { color: colors.dgreentext }]}>Full Name</Text>
            <TextInput
              placeholder="John Doe"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            {/* Email Section */}
            <Text style={[styles.label, { color: colors.dgreentext }]}>Email Address</Text>
            <TextInput
              placeholder="john@example.com"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Contact Section */}
            <Text style={[styles.label, { color: colors.dgreentext }]}>Contact Number</Text>
            <TextInput
              placeholder="e.g. 09123456789"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={handleChange('contact')}
              onBlur={handleBlur('contact')}
              value={values.contact}
              keyboardType="numeric"
            />
            {touched.contact && errors.contact && <Text style={styles.error}>{errors.contact}</Text>}

            {/* Why should we hire you Section */}
            <Text style={[styles.label, { color: colors.dgreentext }]}>Why should we hire you?</Text>
            <TextInput
              placeholder="Describe your skills and experience..."
              placeholderTextColor="#999"
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange('reason')}
              onBlur={handleBlur('reason')}
              value={values.reason}
              multiline
              numberOfLines={4}
            />
            {touched.reason && errors.reason && <Text style={styles.error}>{errors.reason}</Text>}

            <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Submit Application</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}