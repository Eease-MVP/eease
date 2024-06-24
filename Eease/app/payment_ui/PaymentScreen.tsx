import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';

const PaymentScreen = () => {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const prices = [
    { amount: 30, duration: 30 },
    { amount: 60, duration: 60 },
    { amount: 90, duration: 90 },
  ];

  const handlePayment = () => {
    if (selectedPrice === null) {
      Alert.alert("Error", "Please select a price option.");
      return;
    }
    // Handle the payment process here
    Alert.alert("Success", "Payment processed successfully.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      
      <Text style={styles.subtitle}>Select Duration:</Text>
      {prices.map((price, index) => (
        <Pressable
          key={index}
          style={[
            styles.priceOption,
            selectedPrice === price.amount && styles.selectedPriceOption,
          ]}
          onPress={() => setSelectedPrice(price.amount)}
        >
          <Text style={styles.priceText}>
            {price.amount} kr for {price.duration} minutes
          </Text>
        </Pressable>
      ))}

      <Text style={styles.subtitle}>Scan Swish QR Code to Pay:</Text>
      <Image
        source={require('../../assets/images/qrcode.png')} // Ensure this path is correct
        style={styles.qrCode}
      />

      <Pressable style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Confirm Payment</Text>
      </Pressable>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  priceOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedPriceOption: {
    backgroundColor: '#6f7dc7',
  },
  priceText: {
    fontSize: 16,
    color: '#000',
  },
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 16,
  },
  paymentButton: {
    backgroundColor: '#6f7dc7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PaymentScreen;
