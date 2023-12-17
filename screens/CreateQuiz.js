// createQuiz.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
const QuizCreationScreen = () => {
  const navigation = useNavigation();
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const handleCreateQuiz = async () => {
    try {
       const token = await AsyncStorage.getItem('userToken');
       const user = await AsyncStorage.getItem('UserId');
       console.log(" THIS IS THE TOKENNNNN  ->  ",token);
       if (!token) {
           console.error('Token not found');
           return null;
       }
       //console.log(questions[0].options)

       const response = await axios.post('http://localhost:3001/api/quiz/createQuiz', {
         UserId: user,
         quizName: quizName,
         questions: questions.map(question => ({
           "question": question.question,
           "options": question.options,
           "answerIndex": question.correctAnswerIndex
         }))
       }, {
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `${token}`
           }
       });

       //return response.data;
   } catch (error) {
       console.error('Error creating quiz:', error);
       return null;
   }
 };

  const [saveSuccessful, setSaveSuccessful] = useState(false); // New state variable for tracking save success
  // Function to save the quiz locally
  const saveQuiz = async () => {
    const quizId = `quiz-${new Date().getTime()}`;
    console.log('Quiz Data Before Saving:', quizData);
    const quizData = {
      quizId,
      quizName,
      questions,
    };

    try {
      // Retrieve the existing list of quiz IDs, or initialize to an empty array if none exist
      const existingQuizIds = JSON.parse(await AsyncStorage.getItem('quizIds')) || [];

      // Push the new quiz ID onto the array
      const newQuizIds = [...existingQuizIds, quizId];

      // Save the updated array of quiz IDs
      await AsyncStorage.setItem('quizIds', JSON.stringify(newQuizIds));

      // Save the individual quiz data
      await AsyncStorage.setItem(quizId, JSON.stringify(quizData));

      console.log('Quiz Data After Saving:', quizData);
      console.log('Quiz saved successfully with ID:', quizId);
      const keys = await AsyncStorage.getAllKeys();
      console.log('AsyncStorage Keys:', keys);
      setSaveSuccessful(true);
      // Reset state variables
      setQuizName('');
      setQuestions([]);
      setCurrentQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex('');
    } catch (error) {
      console.error('Error saving quiz: ', error);
      setSaveSuccessful(false);
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      question: currentQuestion,
      options,
      correctAnswerIndex,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswerIndex('');
  };


  return (
    <View>
      <Text>Create Quiz</Text>
      <TextInput
        placeholder="Quiz Name"
        value={quizName}
        onChangeText={setQuizName}
      />
      <TextInput
        placeholder="Enter question"
        value={currentQuestion}
        onChangeText={setCurrentQuestion}
      />
      {options.map((option, index) => (
        <TextInput
          key={index}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChangeText={(text) => {
            const updatedOptions = [...options];
            updatedOptions[index] = text;
            setOptions(updatedOptions);
          }}
        />
      ))}
      <TextInput
        placeholder="Correct Answer Index"
        keyboardType="numeric"
        value={correctAnswerIndex.toString()} // Convert to string for input value
        onChangeText={(text) => {
          // Parse the input text as an integer or set it to an empty string if not a valid integer
          const intValue = parseInt(text, 10);
          if (!isNaN(intValue)) {
            setCorrectAnswerIndex(intValue);
          } else {
            setCorrectAnswerIndex('');
          }
        }}
      />
      <Button title="Add Question" onPress={addQuestion} />
      <Button title="Save Quiz" onPress={() => {saveQuiz().then(handleCreateQuiz);}} />
      {/* Display success message */}
      {saveSuccessful && (
        <Text>Flashcard Set Saved Successfully!</Text>
      )}
      {/* Display questions and options */}
      {questions.map((q, index) => (
        <View key={index}>
          <Text>{q.question}</Text>
          {q.options.map((option, i) => (
            <Text key={i}>{option}</Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default QuizCreationScreen;
