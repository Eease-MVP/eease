import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import RangeSlider from "react-native-range-slider-expo";
import { CheckBox } from "react-native-elements";

// Define Gender type and genders array
type Gender = {
  value: string;
  label: string;
};

const genders: Gender[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

const ReceptorPreferences = () => {
  const router = useRouter();

  const [preferredAgeGap, setPreferredAgeGap] = useState<{ min: number; max: number }>({ min: 18, max: 100 });
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [cityToAvoid, setCityToAvoid] = useState<string>("");

  const handleSavePreferences = () => {
    if (selectedGenders.length === 0 || !cityToAvoid) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    console.log("preferences saved:", { preferredAgeGap, selectedGenders, cityToAvoid });
    Alert.alert("Preferences saved", "Your preferences have been saved successfully");

    // Save preferences logic here
    router.replace("(tabs)"); // Navigate to the main tab screen after saving preferences
  };

  const toggleGenderSelection = (gender: Gender) => {
    setSelectedGenders((prevSelectedGenders) => {
      if (prevSelectedGenders.some(g => g.value === gender.value)) {
        return prevSelectedGenders.filter((g) => g.value !== gender.value);
      } else {
        return [...prevSelectedGenders, gender];
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Receptor Preferences</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gender</Text>
        {genders.map((gender) => (
          <View key={gender.value} style={styles.checkboxContainer}>
            <CheckBox
              checked={selectedGenders.some(g => g.value === gender.value)}
              onPress={() => toggleGenderSelection(gender)}
              checkedColor="#6f7dc7"
              containerStyle={styles.checkbox}
            />
            <Text style={styles.label}>{gender.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Age</Text>
        <RangeSlider
          min={18}
          max={100}
          fromValueOnChange={(value) => setPreferredAgeGap((prev) => ({ ...prev, min: value }))}
          toValueOnChange={(value) => setPreferredAgeGap((prev) => ({ ...prev, max: value }))}
          styleSize="small"
        />
        <Text style={styles.ageText}>Selected Age Range: {preferredAgeGap.min} - {preferredAgeGap.max}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location I want to avoid:</Text>
        <TextInput
          style={styles.input}
          value={cityToAvoid}
          onChangeText={setCityToAvoid}
          placeholder="Type the city you want to avoid"
        />
      </View>

      <Pressable style={styles.button} onPress={handleSavePreferences}>
        <Text style={styles.buttonText}>Save Preferences</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6f7dc7",
  },
  section: {
    marginBottom: 30, // Increased margin to ensure no overlap
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#000",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6f7dc7",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    marginRight: 10,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  ageText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default ReceptorPreferences;
