import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const loadQuizzes = async () => {
  try {
    // Retrieve the list of quiz IDs
    const quizIds = JSON.parse(await AsyncStorage.getItem('quizIds')) || [];
    
    // Fetch each quiz by its ID
    const quizzes = await Promise.all(
      quizIds.map(async (id) => {
        const quizData = await AsyncStorage.getItem(id);
        return quizData ? JSON.parse(quizData) : null;
      })
    );

    // Filter out any potential null values (e.g., if a quiz failed to load)
    return quizzes.filter(Boolean);
  } catch (error) {
    console.error("Failed to load quizzes:", error);
    return [];
  }
};
