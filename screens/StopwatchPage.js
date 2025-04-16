import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function StopwatchPage({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleStart = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch</Text>
      <Text style={styles.time}>{formatTime(seconds)}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.endButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={running ? styles.pauseButton : styles.startButton}
          onPress={running ? handlePause : handleStart}
        >
          <Text style={styles.buttonText}>{running ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
      </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B899',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  time: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 30,
  },
  endButton: {
    backgroundColor: '#8B3D3D',
    padding: 20,
    borderRadius: 100,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 100,
  },
  pauseButton: {
    backgroundColor: '#F5A623',
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navBar: {
    backgroundColor: '#C9AD8C',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#b8a074',
    position: 'absolute',
    bottom: 0,
    width: '110%',
  },
});
