import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import SignupPage from "./SignupPage"; 
import HomePage from './HomePage';
import AddAlarmPage from './AddAlarmPage';
import EditAlarmPage from './EditAlarmPage';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);        
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D6B899' }}>
        
      </View>
    );
  }

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
      
        <>
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="AddAlarmPage" component={AddAlarmPage} />
          <Stack.Screen name="EditAlarmPage" component={EditAlarmPage} />
        </>
      ) : (
        
        <>
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SignupPage" component={SignupPage} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  );
}
