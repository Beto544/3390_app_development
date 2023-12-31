// FlashcardList.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export const LoadFlashCardsFromDB = async () => {
  const userId = await AsyncStorage.getItem('UserId');
  const token = await AsyncStorage.getItem('userToken');
 
  if (!token) {
      alert("Please Login!");
      return;
  }
  
  try {
    
      
      const response = await axios.get("http://192.168.1.155:8000/api/flashcards", {
          params: {
            userId: userId,
        },
      });
      
      
      console.log('FlashCards:', response.data);
  } catch (error) {
      console.error('Error loading flashcards:', error);
  }
};

const FlashcardListScreen = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const navigation = useNavigation();

  // Function to load flashcard sets from AsyncStorage
  const loadFlashcardSets = async () => {
    try {
      const setIds = JSON.parse(await AsyncStorage.getItem('flashcardSetIds')) || [];
      const loadedSets = await Promise.all(
        setIds.map(async (id) => {
          const setData = await AsyncStorage.getItem(id);
          return setData ? JSON.parse(setData) : null;
        })
      );
      return loadedSets.filter(Boolean);
    } catch (error) {
      console.error("Failed to load flashcard sets:", error);
      return [];
    }
  };
  const editFlashcardSet = (flashcardSet) => {
    console.log('Editing Flashcard Set ID:', flashcardSet.setId);
    navigation.navigate('EditFlash', { setId: flashcardSet.setId }); // Navigate to EditFlash screen
  };
  // Function to delete a flashcard set
  const deleteFlashcardSet = async (setId) => {
    try {
      // Remove the set from AsyncStorage
      await AsyncStorage.removeItem(setId);

      // Update the list of flashcard sets by excluding the deleted set
      setFlashcardSets((prevSets) => prevSets.filter((set) => set.setId !== setId));

      // Update the list of set IDs
      const setIds = flashcardSets.map((set) => set.setId);
      await AsyncStorage.setItem('flashcardSetIds', JSON.stringify(setIds));

      // show a success message 
      console.log('Deleted Flashcard Set ID:', setId);
    } catch (error) {
      console.error("Failed to delete flashcard set:", error);
    }
  };

  // Function to refresh the flashcard set list
  const refreshFlashcardSetList = async () => {
    const loadedSets = await loadFlashcardSets();
    setFlashcardSets(loadedSets);
  };

  useFocusEffect(() => {
    // Load flashcard sets when the screen comes into focus
    refreshFlashcardSetList();
  });

  const selectFlashcardSet = (flashcardSet) => {
    // Navigate to a screen
    console.log('Selected Flashcard Set ID:', flashcardSet.setId);
    navigation.navigate('TakeFlash', { setId: flashcardSet.setId }); // Pass setId as a parameter
  };

  return (
    <View style={{ flex: 1 }}>
      {flashcardSets.length > 0 ? (
        <FlatList
          data={flashcardSets}
          keyExtractor={(item) => item.setId}
          renderItem={({ item }) => (
            <View style={styles.setItem}>
              <Text style={styles.setTitle}>{item.flashcardSetName}</Text>
              <Text style={styles.setInfo}>
                Number of cards: {item.cards.length}
              </Text>
              <Pressable
                onPress={() => selectFlashcardSet(item)}
                style={styles.viewSetButton}
              >
                <Text>View Set</Text>
              </Pressable>
              <Pressable
                onPress={() => editFlashcardSet(item)}
                style={styles.editSetButton}
              >
                <Text>Edit Set</Text>
              </Pressable>
              <Pressable
                onPress={() => deleteFlashcardSet(item.setId)}
                style={styles.deleteSetButton}
              >
                <Text>Delete Set</Text>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <Text>No flashcard sets available</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  setItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
  },
  setTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  setInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  viewSetButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#5cb85c',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteSetButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#d9534f', // Red for delete button
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  editSetButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#337ab7', // blue for edit button
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  
});

export default FlashcardListScreen;
