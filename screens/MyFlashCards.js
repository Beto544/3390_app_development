// FlashcardList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const FlashcardListScreen = () => {
  const [flashcards, setFlashcards] = useState([]);
  const navigation = useNavigation();

  // Function to load flashcards from AsyncStorage
  const loadFlashcards = async () => {
    try {
      const flashcardIds = JSON.parse(await AsyncStorage.getItem('flashcards')) || [];
      const flashcards = await Promise.all(
        flashcardIds.map(async (id) => {
          const flashcardData = await AsyncStorage.getItem(id);
          return flashcardData ? JSON.parse(flashcardData) : null;
        })
      );
      return flashcards.filter(Boolean);
    } catch (error) {
      console.error("Failed to load flashcards:", error);
      return [];
    }
  };
  
  // Function to refresh the flashcard list
  const refreshFlashcardList = async () => {
    const loadedFlashcards = await loadFlashcards();
    setFlashcards(loadedFlashcards);
  };

  useFocusEffect(() => {
    // Load flashcards when the screen comes into focus
    refreshFlashcardList();
  });

  const selectFlashcard = (flashcard) => {
    // Navigate to ViewFlashcard screen with flashcard data
    console.log('Selected Flashcard ID:', flashcard.flashcardId);
    navigation.navigate('FlashList', { flashcardId: flashcard.flashcardId }); // Pass flashcardId as a parameter
  };

  return (
    <View style={{ flex: 1 }}>
      {flashcards.length > 0 ? (
        <FlatList
          data={flashcards}
          keyExtractor={(item) => item.flashcardId}
          renderItem={({ item }) => (
            <View style={styles.flashcardItem}>
              <Text style={styles.flashcardQuestion}>{item.question}</Text>
              <Text style={styles.flashcardAnswer}>{item.answer}</Text>
              {/* Add Pressable to select a flashcard */}
              <Pressable
                onPress={() => selectFlashcard(item)}
                style={styles.viewFlashcardButton}
              >
                <Text>View Flashcard</Text>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <Text>No flashcards available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flashcardItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
    backgroundColor: 'white', 
  },
  flashcardQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
  },
  flashcardAnswer: {
    fontSize: 14,
    color: '#666', 
    marginTop: 5, 
  },
  viewFlashcardButton: {
    marginTop: 10, 
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#5cb85c', 
    borderRadius: 5,
    alignSelf: 'flex-start', // align to the left
  },
});

export default FlashcardListScreen;
