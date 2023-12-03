// QuizList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const QuizListScreen = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigation = useNavigation();

  // Define loadQuizzes inside QuizListScreen
  const loadQuizzes = async () => {
    try {
      const quizIds = JSON.parse(await AsyncStorage.getItem('quizIds')) || [];
      const quizzes = await Promise.all(
        quizIds.map(async (id) => {
          const quizData = await AsyncStorage.getItem(id);
          return quizData ? JSON.parse(quizData) : null;
        })
      );
      return quizzes.filter(Boolean);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
      return [];
    }
  };

  useEffect(() => {
    const getQuizzes = async () => {
      const loadedQuizzes = await loadQuizzes();
      setQuizzes(loadedQuizzes);
    };

    getQuizzes();
  }, []);

  const selectQuiz = (quiz) => {
    // Navigate to TakeQuiz screen with quiz data
    navigation.navigate('TakeQuiz', { quizId: quiz.quizId }); // Pass quizId as a parameter
  };

  return (
    <View style={{ flex: 1 }}>
      {quizzes.length > 0 ? (
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.quizId}
          renderItem={({ item }) => (
            <View style={styles.quizItem}>
              <Text style={styles.quizTitle}>{item.quizName}</Text>
              <Text style={styles.quizInfo}>
                Number of questions: {item.questions.length}
              </Text>
              {/* Add Pressable to select a quiz */}
              <Pressable
                onPress={() => selectQuiz(item)}
                style={styles.startQuizButton}
              >
                <Text>Start Quiz</Text>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <Text>No quizzes available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  quizItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
    backgroundColor: 'white', 
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
  },
  quizInfo: {
    fontSize: 14,
    color: '#666', 
    marginTop: 5, 
  },
  startQuizButton: {
    marginTop: 10, 
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#5cb85c', 
    borderRadius: 5,
    alignSelf: 'flex-start', // align to the left
  },
  startQuizButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});


export default QuizListScreen;
