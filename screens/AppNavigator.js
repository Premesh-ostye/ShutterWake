import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import LoginPage from './LoginPage';
import SignupPage from "./SignupPage";
import HomePage from './HomePage';
import AddAlarmPage from './AddAlarmPage';
import EditAlarmPage from './EditAlarmPage';
import TimerPage from './TimerPage';
import StopwatchPage from './StopwatchPage';
import SettingsPage from './SettingsPage';
import AccountSettingsPage from './AccountSettingsPage'
import AlarmPreviewPage from './AlarmPreviewPage';
import AlarmChallengePage from './AlarmChallengePage';




import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Timer') {
                        iconName = focused ? 'timer' : 'timer-outline';
                    } else if (route.name === 'Stopwatch') {
                        iconName = focused ? 'stopwatch' : 'stopwatch-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: {
                    backgroundColor: '#D6B899',
                    borderTopWidth: 1,
                    borderTopColor: 'black',
                },

            })}
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Timer" component={TimerPage} />
            <Tab.Screen name="Stopwatch" component={StopwatchPage} />
            <Tab.Screen name="Settings" component={SettingsPage} />
        </Tab.Navigator>
    );
}

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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D6B899' }} />
        );
    }

    return (
        <NavigationContainer key={user?.uid || 'guest'}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                        <Stack.Screen name="MainTabs" component={MainTabs} />
                        <Stack.Screen name="AddAlarm" component={AddAlarmPage} />
                        <Stack.Screen name="EditAlarmPage" component={EditAlarmPage}/>
                        <Stack.Screen name="AccountSettings" component={AccountSettingsPage} />
                        <Stack.Screen name="AlarmPreviewPage" component={AlarmPreviewPage} />
                        <Stack.Screen name="AlarmChallengePage" component={AlarmChallengePage} />


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
