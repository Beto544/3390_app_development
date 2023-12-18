//CreateFlashCards.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



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
            setSaveSuccessful(true); // Set to true upon successful save

            console.log('Flashcard Set Data After Saving:', flashcardSetData);
        } catch (error) {
            console.error('Error saving flashcard set: ', error);
            setSaveSuccessful(false); 
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

    const handleCreateSet = async () => {
        try {
           const token = await AsyncStorage.getItem('userToken');
           const user = await AsyncStorage.getItem('UserId');
           console.log(" THIS IS THE TOKENNNNN  ->  ",token);
           if (!token || !user) {
               console.error('NO USER LOGGED IN');
               return null;
           }
        console.log(cards[0].front,cards[0].back);
           const response = await axios.post('http://192.168.1.155:8000/api/set/createSet', {
             UserId: user,
             setName: flashcardSetName,
             card: cards.map(card => ({
               "front": card.front,
               "back": card.back
             }))
           }, {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `${token}`
               }
           });
    
           //return response.data;
       } catch (error) {
           console.error('Error creating FLASHCARDS:', error);
           return null;
       }
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
            <Button title="Save Flashcard Set" onPress={() => {saveFlashcardSet().then(handleCreateSet);}} />

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
