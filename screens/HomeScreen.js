import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation(); // Initialize navigation


    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome User!</Text>
            <Image style={styles.image}
                source={require('../assets/Quiz.png')}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        height: 370,
        width: "100%",
        resizeMode: "contain",
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    }
});

