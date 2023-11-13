// createQuiz.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const QuizCreationScreen = () => {
  const navigation = useNavigation();
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');

  // Function to save the quiz locally
  const saveQuiz = async () => {
    const quizId = `quiz-${new Date().getTime()}`;
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

  console.log('Quiz Data:', quizData);
  console.log('Quiz saved successfully with ID:', quizId);
  
  // Proceed to navigate to the 'TakeQuiz' screen
  //navigation.navigate('TakeQuiz', { quizId });

} catch (error) {
  console.error('Error saving quiz: ', error);
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
        value={correctAnswerIndex}
        onChangeText={(text) => setCorrectAnswerIndex(text)}
      />
      <Button title="Add Question" onPress={addQuestion} />
      <Button title="Save Quiz" onPress={saveQuiz} />
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
