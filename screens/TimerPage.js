import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimerPage({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerTime, setPickerTime] = useState(new Date());
  const [customSeconds, setCustomSeconds] = useState(0);

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  useEffect(() => {
    if (running && seconds === 0) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  }, [seconds, running]);

  const handleStart = () => {
    if (seconds > 0 && !running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
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
    setCustomSeconds(0);
  };

  const handleQuickStart = (durationInSeconds) => {
    clearInterval(intervalRef.current);
    setCustomSeconds(0);
    setSeconds(durationInSeconds);
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const openCustomPicker = () => {
    setPickerTime(new Date());
    setShowPicker(true);
  };

  const onTimeChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const totalSeconds = (hours * 60 + minutes) * 60;
      if (totalSeconds > 0) {
        setCustomSeconds(totalSeconds);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
      <Text style={styles.time}>{formatTime(seconds)}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.endButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={running ? styles.pauseButton : styles.startButton}
          onPress={running ? handlePause : handleStart}
        >
          <Text style={styles.buttonText}>
            {running ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickTimers}>
        <TouchableOpacity onPress={() => handleQuickStart(30 * 60)} style={styles.quickButton}>
          <Text style={styles.quickText}>30 min</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleQuickStart(60 * 60)} style={styles.quickButton}>
          <Text style={styles.quickText}>1 hr</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleQuickStart(2 * 60 * 60)} style={styles.quickButton}>
          <Text style={styles.quickText}>2 hr</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity onPress={openCustomPicker} style={styles.customButton}>
        <Text style={styles.customButtonText}>Set Custom Timer</Text>
      </TouchableOpacity>

      {customSeconds > 0 && !running && (
        <TouchableOpacity onPress={() => handleQuickStart(customSeconds)} style={styles.customStartBtn}>
          <Text style={styles.customStartText}>Start Timer</Text>
        </TouchableOpacity>
      )}

      {showPicker && (
        <DateTimePicker
          value={pickerTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onTimeChange}
        />
      )}

      
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
    marginBottom: 40,
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
  quickTimers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '90%',
  },
  quickButton: {
    backgroundColor: '#EBD8B9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  quickText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#aaa',
    width: '85%',
    marginVertical: 20,
  },
  customButton: {
    backgroundColor: '#C9AD8C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  customStartBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
  },
  customStartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
