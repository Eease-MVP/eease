import React, { useState } from "react"
import { StyleSheet, Text, View, Button, Linking } from "react-native"

export default function TermsPage() {
  const [isSelected, setSelection] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meela</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.heading}>Läs gärna informationen noggrant</Text>

        <Text style={styles.sectionTitle}>
          1. Meela förmedlar enbart privat terapi
        </Text>
        <Text style={styles.text}>
          Meela är inte kopplat till det svenska offentliga vårdsystemet. En
          privat terapisession kostar 800-1300 kr.
        </Text>

        <Text style={styles.sectionTitle}>
          2. Meela kan inte hjälpa personer med allvarliga psykiska sjukdomar,
          och är inte en räddningstjänst
        </Text>
        <Text style={styles.text}>
          Om du har en allvarlig psykisk sjukdom* råder vi dig att kontakta
          närmsta vårdcentral. Vid livsfarlig fara, kontakta:
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL("tel:112")}>
          SOS Alarm - ring 112
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL("tel:90101")}>
          Mind Självmordslinje - ring 90101
        </Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://chat.mind.se/")}
        >
          Mind Självmordslinje Chatt
        </Text>
        <Text style={styles.note}>
          *Exempelvis personlighetsstörning, psykotisk störning och annan svår
          psykisk sjukdom.
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>
          Jag har läst och förstår informationen ovan.
        </Text>
      </View>

      <Button
        title="Nästa"
        onPress={() => {
          if (isSelected) {
            // handle navigation
          } else {
            alert("Du måste läsa och förstå informationen ovan.")
          }
        }}
        disabled={!isSelected}
      />
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
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
})
