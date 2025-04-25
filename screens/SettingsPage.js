import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';



export default function SettingsPage({ navigation }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AccountSettings')}>
        <Text style={styles.optionText}>Account Settings ›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Alarm Preferences ›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Notification Settings ›</Text>
      </TouchableOpacity>

      <View style={styles.option}>
        <Text style={styles.optionText}>Theme</Text>
        <View style={styles.themeSwitch}>
          <Ionicons name="moon" size={18} style={{ marginRight: 5 }} />
          <Switch value={isDark} onValueChange={setIsDark} />
          <Ionicons name="sunny" size={18} style={{ marginLeft: 5 }} />
        </View>
      </View>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>About us ›</Text>
      </TouchableOpacity>

      <View style={styles.option}>
        <Text style={styles.optionText}>Under development</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Under development</Text>
      </View>

      

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B899',
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#E8E8E8',
    width: '85%',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  themeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
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
