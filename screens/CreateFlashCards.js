import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FlashcardCreationScreen = () => {
    const [flashcardSetName, setFlashcardSetName] = useState('');
    const [cards, setCards] = useState([]);
    const [currentFront, setCurrentFront] = useState('');
    const [currentBack, setCurrentBack] = useState('');
    const [saveSuccessful, setSaveSuccessful] = useState(false); // New state variable for tracking save success

    // Function to save the flashcard set locally
    const saveFlashcardSet = async () => {
        const setId = `flashcard-set-${new Date().getTime()}`;
        const flashcardSetData = {
            setId,
            flashcardSetName,
            cards,
        };

        try {
            const existingSetIds = JSON.parse(await AsyncStorage.getItem('flashcardSetIds')) || [];
            const newSetIds = [...existingSetIds, setId];
            await AsyncStorage.setItem('flashcardSetIds', JSON.stringify(newSetIds));
            await AsyncStorage.setItem(setId, JSON.stringify(flashcardSetData));

            setFlashcardSetName('');
            setCards([]);
            setSaveSuccessful(true); // Set saveSuccessful to true upon successful save

            console.log('Flashcard Set Data After Saving:', flashcardSetData);
        } catch (error) {
            console.error('Error saving flashcard set: ', error);
            setSaveSuccessful(false); // Set saveSuccessful to false if there's an error
        }
    };

    const addCard = () => {
        const newCard = {
            front: currentFront,
            back: currentBack,
        };

        setCards([...cards, newCard]);
        setCurrentFront('');
        setCurrentBack('');
    };

    return (
        <View>
            <TextInput
                placeholder="Flashcard Set Name"
                value={flashcardSetName}
                onChangeText={setFlashcardSetName}
            />
            <TextInput
                placeholder="Front (Question/Term)"
                value={currentFront}
                onChangeText={setCurrentFront}
            />
            <TextInput
                placeholder="Back (Answer/Definition)"
                value={currentBack}
                onChangeText={setCurrentBack}
            />
            <Button title="Add Card" onPress={addCard} />
            <Button title="Save Flashcard Set" onPress={saveFlashcardSet} />

            {/* Display success message */}
            {saveSuccessful && (
                <Text>Flashcard Set Saved Successfully!</Text>
            )}

            {/* Display cards */}
            {cards.map((card, index) => (
                <View key={index}>
                    <Text>Front: {card.front}</Text>
                    <Text>Back: {card.back}</Text>
                </View>
            ))}
        </View>
    );
};

export default FlashcardCreationScreen;
