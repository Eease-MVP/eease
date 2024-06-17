import { useNavigation } from "expo-router"
import React, { useState } from "react"
import { StyleSheet, Text, View, Button, Linking } from "react-native"
import { TouchableOpacity } from "react-native"

export default function TermsPage() {
  const [isSelected, setSelection] = useState(false)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meela</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>
          Please read the information carefully
        </Text>

        <Text style={styles.sectionTitle}>
          1. Meela only provides private therapy
        </Text>
        <Text style={styles.text}>
          Meela is not connected to the Swedish public healthcare system. A
          private therapy session costs 800-1300 SEK.
        </Text>

        <Text style={styles.sectionTitle}>
          2. Meela cannot help individuals with severe mental illnesses, and is
          not an emergency service
        </Text>
        <Text style={styles.text}>
          If you have a severe mental illness*, we advise you to contact your
          nearest healthcare center. In case of life-threatening danger,
          contact:
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL("tel:112")}>
          SOS Alarm - call 112
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL("tel:90101")}>
          Mind Suicide Hotline - call 90101
        </Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://chat.mind.se/")}
        >
          Mind Suicide Hotline Chat
        </Text>
        <Text style={styles.note}>
          *For example, personality disorder, psychotic disorder, and other
          severe mental illnesses.
        </Text>
        <View style={styles.line} />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setSelection(!isSelected)}
          >
            {isSelected && <Text>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I have read and understand the information above.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !isSelected && styles.buttonDisabled]}
        onPress={() => {
          if (isSelected) {
            navigation.goBack() // Navigerar tillbaka till föregående vy
          } else {
            alert("You must read and understand the information above.")
          }
        }}
        disabled={!isSelected}
      >
        <Text
          style={[styles.buttonText, isSelected && styles.buttonTextSelected]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f5f3",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e74c3c",
    textAlign: "center",
    marginVertical: 20,
  },
  infoContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  link: {
    fontSize: 14,
    color: "#3498db",
    marginBottom: 5,
  },
  note: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#e0e0e0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d3d3d3",
  },
  buttonTextSelected: {
    color: "#000000",
  },
})
