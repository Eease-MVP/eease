import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router";
import RangeSlider from "react-native-range-slider-expo";

const ReceptorPreferences = () => {
  const router = useRouter();

  const [preferredAgeGap, setPreferredAgeGap] = useState<{ min: number; max: number }>({ min: 18, max: 100 });
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [cityToAvoid, setCityToAvoid] = useState<string>("");
  const [noCityPreference, setNoCityPreference] = useState(false);

  const handleSavePreferences = () => {
    if (selectedGenders.length === 0 || (!cityToAvoid && !noCityPreference)) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    console.log("preferences saved:", { preferredAgeGap, selectedGenders, cityToAvoid });
    Alert.alert("Preferences saved", "Your preferences have been saved successfully");

    // Save preferences logic here
    router.replace("(tabs)"); // Navigate to the main tab screen after saving preferences
  };

  const toggleGenderSelection = (gender: string) => {
    setSelectedGenders((prevSelectedGenders) => {
      if (prevSelectedGenders.includes(gender)) {
        return prevSelectedGenders.filter((g) => g !== gender);
      } else {
        return [...prevSelectedGenders, gender];
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receptor Preferences</Text>

      {/* Gender Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferred Gender(s):</Text>
        {["Male", "Female", "Non-binary"].map((gender) => (
          <Pressable
            key={gender}
            onPress={() => toggleGenderSelection(gender)}
            style={[
              styles.option,
              selectedGenders.includes(gender) && styles.selectedOption,
            ]}
          >
            <Text style={styles.optionText}>{gender}</Text>
          </Pressable>
        ))}
      </View>

      {/* Age Range Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferred Age Gap:</Text>
        <RangeSlider
          min={18}
          max={100}
          fromValueOnChange={(value) => setPreferredAgeGap((prev) => ({ ...prev, min: value }))}
          toValueOnChange={(value) => setPreferredAgeGap((prev) => ({ ...prev, max: value }))}
          styleSize="small"
        />
        <Text style={styles.selectedRangeText}>Selected Age Range: {preferredAgeGap.min} - {preferredAgeGap.max}</Text>
      </View>

      {/* City to Avoid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>City to Avoid:</Text>
        {noCityPreference ? (
          <Text>None</Text>
        ) : (
          <TextInput
            style={styles.input}
            value={cityToAvoid}
            onChangeText={setCityToAvoid}
            placeholder="Type the city you want to avoid"
          />
        )}
        <Pressable
          onPress={() => setNoCityPreference(!noCityPreference)}
          style={[
            styles.option,
            noCityPreference && styles.selectedOption,
          ]}
        >
          <Text style={styles.optionText}>None</Text>
        </Pressable>
      </View>

      {/* Save Preferences Button */}
      <Pressable style={styles.button} onPress={handleSavePreferences}>
        <Text style={styles.buttonText}>Save Preferences</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#6f7dc7",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  option: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#6f7dc7',
    borderColor: '#6f7dc7',
  },
  optionText: {
    color: '#000',
  },
  selectedRangeText: {
    marginTop: 8,
  },
});

export default ReceptorPreferences;
