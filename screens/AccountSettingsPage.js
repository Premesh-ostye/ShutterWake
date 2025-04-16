import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from './firebaseConfig';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';

export default function AccountSettingsPage() {
    const user = auth.currentUser;

    const handlePasswordReset = () => {
        if (user?.email) {
            sendPasswordResetEmail(auth, user.email)
                .then(() => Alert.alert('Check your email', 'Password reset link sent.'))
                .catch(error => Alert.alert('Error', error.message));
        }
    };

    const handleLogout = () => {
        signOut(auth).catch(error => Alert.alert('Error', error.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Account Settings</Text>
            <Text style={styles.label}>Logged in as:</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6B899',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    email: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 40,
        color: '#000',
    },
    button: {
        backgroundColor: '#333',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#8B0000',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
    },
});
