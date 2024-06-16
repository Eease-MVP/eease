// app/preferences/_layout.tsx
import React from 'react';
import { View } from 'react-native';
import PreferencesScreen from '@/components/preference_form/PreferencesScreen';

export default function PreferencesLayout() {
  return (
    <View style={{ flex: 1 }}>
      <PreferencesScreen />
    </View>
  );
}
