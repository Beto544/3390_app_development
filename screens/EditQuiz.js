// EditQuizScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditQuizScreen = ({ route }) => {
  const { quizId } = route.params;
  const [quizData, setQuizData] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const [quizUpdated, setQuizUpdated] = useState(false);


  useEffect(() => {
    // Load quiz data from AsyncStorage based on the quizId
    const loadQuizData = async () => {
      try {
        const quizData = await AsyncStorage.getItem(quizId);
        if (quizData) {
          const quiz = JSON.parse(quizData);
          setQuizData(quiz);
        }
      } catch (error) {
        console.error('Error loading quiz data:', error);
      }
    };

    loadQuizData();
  }, [quizId]);

  const addQuestion = () => {
    // Create a new question object
    const newQuestionObj = {
      question: newQuestion,
      options,
      correctAnswerIndex,
    };

    // Add the new question to the quizData
    if (quizData) {
      quizData.questions.push(newQuestionObj);
      setQuizData({ ...quizData });

      // Clear input fields
      setNewQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex('');
    }
  };

  const deleteQuestion = (index) => {
    // Delete the question at the specified index
    if (quizData) {
      quizData.questions.splice(index, 1);
      setQuizData({ ...quizData });
    }
  };

  const saveQuizChanges = async () => {
    // Save the updated quiz data to AsyncStorage
    if (quizData) {
      try {
        await AsyncStorage.setItem(quizId, JSON.stringify(quizData));
        console.log('Quiz changes saved successfully.');
        setQuizUpdated(true);
      } catch (error) {
        console.error('Error saving quiz changes:', error);
      }
    }
  };

  return (
    <View>
      <Text>Edit Quiz</Text>
      <Text>Quiz Name: {quizData ? quizData.quizName : ''}</Text>
      <TextInput
        placeholder="New Question"
        value={newQuestion}
        onChangeText={setNewQuestion}
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
      <FlatList
        data={quizData ? quizData.questions : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item.question}</Text>
            {item.options.map((option, i) => (
              <Text key={i}>{option}</Text>
            ))}
            <Button
              title="Delete Question"
              onPress={() => deleteQuestion(index)}
            />
          </View>
        )}
      />
      <Button title="Save Changes" onPress={saveQuizChanges} />
    {quizUpdated && <Text>Quiz Updated</Text>}
    </View>
  );
};

export default EditQuizScreen;
