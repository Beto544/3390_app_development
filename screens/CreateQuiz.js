import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const QuizCreationScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');

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
      {/* Display questions and options */}
      {questions.map((q, index) => (
        <View key={index}>
          <Text>{q.question}</Text>
          {q.options.map((option, i) => (
            <Text key={i}>{option}</Text>
          ))}
        </View>
      ))}
      {/* Additional logic for evaluating and displaying quiz results */}
    </View>
  );
};

export default QuizCreationScreen;
