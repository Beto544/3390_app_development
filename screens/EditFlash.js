import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditFlashScreen = ({ route }) => {
    const { setId } = route.params;
    const [flashcardSet, setFlashcardSet] = useState(null);
    const [currentFront, setCurrentFront] = useState('');
    const [currentBack, setCurrentBack] = useState('');

    // Load the flashcard set
    useEffect(() => {
        const loadFlashcardSet = async () => {
            const storedSet = await AsyncStorage.getItem(setId);
            if (storedSet) {
                setFlashcardSet(JSON.parse(storedSet));
            }
        };

        loadFlashcardSet();
    }, [setId]);

    // Function to add a new card
    const addCard = () => {
        if (currentFront.trim() === '' || currentBack.trim() === '') {
            Alert.alert('Invalid input', 'Please enter both front and back of the card.');
            return;
        }

        const newCard = { front: currentFront, back: currentBack };
        const updatedSet = { ...flashcardSet, cards: [...flashcardSet.cards, newCard] };
        setFlashcardSet(updatedSet);
        setCurrentFront('');
        setCurrentBack('');
        saveFlashcardSet(updatedSet);
    };

    // Function to delete a card
    const deleteCard = (index) => {
        const updatedCards = flashcardSet.cards.filter((_, cardIndex) => cardIndex !== index);
        const updatedSet = { ...flashcardSet, cards: updatedCards };
        setFlashcardSet(updatedSet);
        saveFlashcardSet(updatedSet);
    };

    // Function to save the updated flashcard set
    const saveFlashcardSet = async (updatedSet) => {
        await AsyncStorage.setItem(setId, JSON.stringify(updatedSet));
    };

    if (!flashcardSet) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Flashcard Set: {flashcardSet.flashcardSetName}</Text>
            <TextInput
                style={styles.input}
                placeholder="Front (Question/Term)"
                value={currentFront}
                onChangeText={setCurrentFront}
            />
            <TextInput
                style={styles.input}
                placeholder="Back (Answer/Definition)"
                value={currentBack}
                onChangeText={setCurrentBack}
            />
            <Button title="Add Card" onPress={addCard} />

            <FlatList
                data={flashcardSet.cards}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text>Front: {item.front}</Text>
                        <Text>Back: {item.back}</Text>
                        <Button title="Delete Card" onPress={() => deleteCard(index)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 5,
    },
    card: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 5,
    }
});

export default EditFlashScreen;
