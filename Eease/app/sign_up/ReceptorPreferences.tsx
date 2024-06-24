import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable, Alert, TextInput} from "react-native"
import { Select } from "@mobile-reality/react-native-select-pro"
import { useRouter } from "expo-router"

import { Gender, genders, languages, Language } from "@/constants/ProfileInfo"

const ReceptorPreferences = () => {
  const router = useRouter()

  const [preferredAgeGap, setPreferredAgeGap] = useState<string | undefined>()
  const [preferredGender, setPreferredGender] = useState<Gender | undefined>()
  const [cityToAvoid, setCityToAvoid] = useState<string>("")

  const ages = Array.from({ length: 100 - 18 + 1 }, (v, i) => i + 18).map(
    (age) => ({
      value: age.toString(),
      label: age.toString(),
    })
  )

  const handleSavePreferences = () => {
    if (!preferredAgeGap || !preferredGender || !cityToAvoid) {
      Alert.alert("Error", "Please fill all the fields.")
      return
    }
    console.log("preferences saved:", {preferredAgeGap, preferredGender, cityToAvoid})
    Alert.alert("preferences saved", "Your preferences have been saved successfully")

    // Save preferences logic here

    router.push("payment_ui/PaymentScreen"); // Navigate to the main tab screen after saving preferences
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receptor Preferences</Text>

      <View>
        <Text style={styles.label}>Preferred Age Gap:</Text>
        <Select
          options={ages}
          placeholderText="Select preferred age gap"
          onSelect={(value) => setPreferredAgeGap(value.value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Preferred Gender:</Text>
        <Select
          options={genders}
          placeholderText="Select preferred gender"
          onSelect={(value) => setPreferredGender(Gender.parse(value.value))}
        />
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
  )
}

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
})

export default ReceptorPreferences
