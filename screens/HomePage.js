import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db } from './firebaseConfig';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

export default function HomePage({ navigation }) {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const alarmRef = collection(db, 'users', userId, 'alarms');
    const unsub = onSnapshot(alarmRef, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlarms(list);
    });

    return unsub;
  }, []);

  const toggleSwitch = async (id, current) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const docRef = doc(db, 'users', userId, 'alarms', id);
    await updateDoc(docRef, { active: !current });
  };

  const deleteAlarm = async (id) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const docRef = doc(db, 'users', userId, 'alarms', id);
    await deleteDoc(docRef);
  };

  const renderAlarm = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EditAlarmPage', { alarm: item })}>
      <View style={styles.alarmRow}>
        <View>
          <Text style={styles.timeText}>{item.time}</Text>
          <Text style={styles.alarmName}>{item.name || 'Alarm'}</Text>
        </View>
        <View style={styles.rowRight}>
          <Switch
            value={item.active}
            onValueChange={() => toggleSwitch(item.id, item.active)}
            thumbColor="#000"
          />
          <TouchableOpacity onPress={() => deleteAlarm(item.id)}>
            <Ionicons name="trash-outline" size={20} color="black" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ShutterWake</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddAlarm')}>
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>
      </View>
  
      {/* Preview Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#E8E8E8',
          padding: 10,
          borderRadius: 20,
          marginBottom: 15,
          alignSelf: 'flex-end',
        }}
        onPress={() => navigation.navigate('AlarmPreviewPage')}
      >
        <Text style={{ fontWeight: 'bold' }}>🔔 Preview Alarm</Text>
      </TouchableOpacity>
  
      {/* Alarm List */}
      <FlatList
        data={alarms}
        renderItem={renderAlarm}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.alarmList}
      />
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B899',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addIcon: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  alarmList: {
    paddingBottom: 100,
  },
  alarmRow: {
    backgroundColor: '#EBD8B9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: '500',
  },
  alarmName: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '600',
    marginBottom: 4,
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
