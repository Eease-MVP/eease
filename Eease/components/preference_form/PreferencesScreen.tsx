// components/preference_form/PreferencesScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInputWithTitle from './TextInputWithTitle';

const PreferencesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences for receptor</Text>
      <TextInputWithTitle title="Gender" value="" onChangeValue={() => {}} placeholder="Select Gender" />
      <TextInputWithTitle title="Age" value="" onChangeValue={() => {}} placeholder="Enter Age" />
      <TextInputWithTitle title="Location" value="" onChangeValue={() => {}} placeholder="Enter Location" />
      <TextInputWithTitle title="Language" value="" onChangeValue={() => {}} placeholder="Select Language" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default PreferencesScreen;
