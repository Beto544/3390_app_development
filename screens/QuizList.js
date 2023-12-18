// QuizList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';




const QuizListScreen = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigation = useNavigation();

  // Function to load quizzes from AsyncStorage
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

  
  // delete a quiz
  const deleteQuiz = async (quizId) => {
    try {
      // Remove the quiz from AsyncStorage
      await AsyncStorage.removeItem(quizId);

      // Update the list of quizzes by excluding the deleted quiz
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.quizId !== quizId));

      // Update the list of quiz IDs
      const quizIds = quizzes.map((quiz) => quiz.quizId);
      await AsyncStorage.setItem('quizIds', JSON.stringify(quizIds));

      // show a success message
      console.log('Deleted Quiz ID:', quizId);
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };
  const editQuiz = (quizId) => {
    console.log('Quiz data before navigation:', quizId);
    navigation.navigate('EditQuiz', { quizId });
  };
  // Function to refresh the quiz list
  const refreshQuizList = async () => {
    const loadedQuizzes = await loadQuizzes();
    setQuizzes(loadedQuizzes);
  };

  useFocusEffect(() => {
    // Load quizzes when the screen comes into focus
    refreshQuizList();
  });

  const selectQuiz = (quiz) => {
    // Navigate to TakeQuiz screen with quiz data
    console.log('Selected QuizID:', quiz.quizId);
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
              <Pressable
                onPress={() => selectQuiz(item)}
                style={styles.startQuizButton}
              >
                <Text style={styles.startQuizButtonText}>Start Quiz</Text>
              </Pressable>
              <Pressable
                onPress={() => editQuiz(item.quizId)} 
                style={styles.editQuizButton} 
              >
                <Text>Edit Quiz</Text>
              </Pressable>
              <Pressable
                onPress={() => deleteQuiz(item.quizId)} 
                style={styles.deleteQuizButton} 
              >
                <Text>Delete Quiz</Text>
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
    alignSelf: 'flex-start', 
  },
  startQuizButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteQuizButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#d9534f', // Red for delete button
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  editQuizButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#337ab7', // Blue for edit button
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  
});


export default QuizListScreen;
