import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation(); // Initialize navigation

    // Function to handle the press action
    const handlePressQuiz = () => {
        // You might want to navigate to the Quiz screen or perform another action
        // navigation.navigate('QuizScreen'); // Use the correct screen name as per your navigation setup
    };

    const handlePressFlashcards = () => {
        // You might want to navigate to the Flashcards screen or perform another action
        // navigation.navigate('FlashcardsScreen'); // Use the correct screen name as per your navigation setup
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome User!</Text>
            <Image style={styles.image}
                source={require('../assets/Quiz.png')}
            />
            <Pressable style={styles.button} onPress={handlePressQuiz}>
                <Text style={styles.buttonText}>Most Recent Quiz</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handlePressFlashcards}>
                <Text style={styles.buttonText}>Most Recent Flashcard</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handlePressFlashcards}>
                <Text style={styles.buttonText}>Favorites</Text>
            </Pressable>
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

