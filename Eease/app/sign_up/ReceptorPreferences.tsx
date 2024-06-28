import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router";
import RangeSlider from "react-native-range-slider-expo";

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
    <View style={styles.container}>
      <Text style={styles.title}>Receptor Preferences</Text>

      <View>
        <Text style={styles.label}>Preferred Age Gap:</Text>
        <RangeSlider
          min={18}
          max={100}
          fromValueOnChange={(value) => setPreferredAgeGap((prev) => ({ ...prev, min: value }))}
          toValueOnChange={(value) => setPreferredAgeGap((prev) => ({ ...prev, max: value }))}
          styleSize="small"
        />
        <Text>Selected Age Range: {preferredAgeGap.min} - {preferredAgeGap.max}</Text>
      </View>

      <View>
        <Text style={styles.label}>Preferred Gender(s):</Text>
        {genders.map((gender) => (
          <Pressable
            key={gender.value}
            onPress={() => toggleGenderSelection(gender)}
            style={[
              styles.genderOption,
              selectedGenders.some(g => g.value === gender.value) && styles.selectedGenderOption,
            ]}
          >
            <Text style={styles.genderText}>{gender.label}</Text>
          </Pressable>
        ))}
      </View>

      <View>
        <Text style={styles.label}>City to Avoid:</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  genderOption: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedGenderOption: {
    backgroundColor: '#6f7dc7',
    borderColor: '#6f7dc7',
  },
  genderText: {
    color: '#000',
  },
});

export default ReceptorPreferences;
