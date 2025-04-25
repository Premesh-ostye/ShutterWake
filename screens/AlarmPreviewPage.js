// AlarmPreviewPage.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AlarmPreviewPage
({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 Alarm Going Off! 🚨</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlarmChallengePage')}>
  <Text style={styles.buttonText}>Snooze</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlarmChallengePage')}>
  <Text style={styles.buttonText}>Stop</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  button: {
    backgroundColor: '#C9AD8C',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
