import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/navigationTypes';
import { styles } from './ApplicationFormScreen.styles';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ApplicationForm'
>;

type RouteProps = RouteProp<RootStackParamList, 'ApplicationForm'>;

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  contact: Yup.string()
    .matches(/^[0-9]+$/, 'Contact must be numbers only')
    .required('Contact number is required'),
  reason: Yup.string()
    .min(10, 'Minimum 10 characters')
    .required('This field is required'),
});

export default function ApplicationFormScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  const { fromSaved } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Application</Text>

      <Formik
        initialValues={{
          name: '',
          email: '',
          contact: '',
          reason: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          Alert.alert(
            'Application Submitted',
            'Your application has been sent successfully!',
            [
              {
                text: 'Okay',
                onPress: () => {
                  resetForm();

                  if (fromSaved) {
                    navigation.navigate('Tabs');
                  } else {
                    navigation.goBack();
                  }
                },
              },
            ]
          );
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              onChangeText={handleChange('contact')}
              onBlur={handleBlur('contact')}
              value={values.contact}
              keyboardType="numeric"
            />
            {touched.contact && errors.contact && (
              <Text style={styles.error}>{errors.contact}</Text>
            )}

            <TextInput
              placeholder="Why should we hire you?"
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange('reason')}
              onBlur={handleBlur('reason')}
              value={values.reason}
              multiline
              numberOfLines={4}
            />
            {touched.reason && errors.reason && (
              <Text style={styles.error}>{errors.reason}</Text>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Submit Application</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}