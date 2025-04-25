import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';






    export default function EditAlarmPage({ route, navigation }) {
        const { alarm } = route.params;

        const [alarmName, setAlarmName] = useState(alarm.name || ''); 
        const [repeat, setRepeat] = useState(alarm.repeat || false);
        const [snooze, setSnooze] = useState(alarm.snooze || false);
        const [time, setTime] = useState(new Date());
        const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');


  // Convert string time to Date object
  React.useEffect(() => {
    const [t, ampm] = alarm.time.split(/(am|pm)/);
    const [h, m] = t.split(':');
    let hour = parseInt(h);
    let minute = parseInt(m);
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    const newTime = new Date();
    newTime.setHours(hour, minute);
    setTime(newTime);
  }, []);

  const onChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') setShowPicker(false);
    if (selectedDate) setTime(selectedDate);
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleUpdate = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const alarmRef = doc(db, 'users', userId, 'alarms', alarm.id);
    await updateDoc(alarmRef, {
        name: alarmName.trim(),
      time: formatTime(time),
      repeat,
      snooze,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Alarm</Text>

      <TextInput
        style={styles.nameInput}
        placeholder="Alarm Name"
        value={alarmName}
        onChangeText={setAlarmName}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={onChange}
        />
      )}

      <View style={styles.options}>
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Repeat</Text>
          <Switch value={repeat} onValueChange={setRepeat} />
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Sound</Text>
          <Ionicons name="chevron-forward" size={22} color="black" />
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Snooze</Text>
          <Switch value={snooze} onValueChange={setSnooze} />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleUpdate}>
          <Ionicons name="save-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B899',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nameInput: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  timeContainer: {
    marginBottom: 20,
    backgroundColor: '#E8E8E8',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  timeText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  options: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#b8a074',
  },
  optionLabel: {
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
