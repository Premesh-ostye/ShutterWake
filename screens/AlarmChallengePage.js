import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AlarmChallengePage({ navigation }) {
  const riddles = [
    {
      question: "What has keys but can't open locks?",
      answer: "keyboard"
    },
    {
      question: "What has to be broken before you can use it?",
      answer: "egg"
    },
    {
      question: "What can travel around the world while staying in the same corner?",
      answer: "stamp"
    }
  ];

  const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === randomRiddle.answer.toLowerCase()) {
      navigation.navigate('Home');
    } else {
      setError('Try again!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.alarmText}>⏰ Alarm is still going off! ⏰</Text>
      <Text style={styles.riddleText}>{randomRiddle.question}</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer here..."
        value={input}
        onChangeText={setInput}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
    padding: 20,
  },
  alarmText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#B22222',
    marginBottom: 30,
  },
  riddleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#C9AD8C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  }
});
