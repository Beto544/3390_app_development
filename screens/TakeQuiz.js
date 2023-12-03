// TakeQuiz.js
import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const resetQuizState = (
  setPoints,
  setIndex,
  setAnswerStatus,
  setAnswers,
  setSelectedAnswerIndex,
  setCounter
) => {
  setPoints(0);
  setIndex(0);
  setAnswerStatus(null);
  setAnswers([]);
  setSelectedAnswerIndex(null);
  setCounter(100);
};

const QuizScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const quizId = route.params?.quizId;

  // points
  const [points, setPoints] = useState(0);

  // index of the question
  const [index, setIndex] = useState(0);

  // answer Status (true or false)
  const [answerStatus, setAnswerStatus] = useState(null);

  // answers
  const [answers, setAnswers] = useState([]);

  // selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  // Counter
  const [counter, setCounter] = useState(100);

  // interval
  let interval = null;
  const optionLabels = ['A', 'B', 'C', 'D'];

  // progress bar
  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  const [quizData, setQuizData] = useState(null);
  const totalQuestions = quizData?.questions.length || 0;
  useEffect(() => {
    console.log("Fetching quiz data...");
    const loadQuiz = async () => {
      try {
        console.log("QuizID received", quizId)
        const quizData = await AsyncStorage.getItem(quizId);

        const keys = await AsyncStorage.getAllKeys();
        console.log('AsyncStorage Keys:', keys);
        if (quizData == null) {
          console.log("No quiz data")
        }
        if (quizData) {
          console.log("Entered quiz data")
          const quiz = JSON.parse(quizData);
          // Now you have your quiz data, set it in the component's state if needed.
          setQuizData(quiz); // Assuming you have a state variable for quiz data.
        } else {
          // Handle the case where there's no quiz data for the given quizId
          // You can show an error message or navigate back to the quiz list screen.
        }
      } catch (error) {
        // Handle errors here
        console.error("Error loading quiz data:", error);
      }
    };

    loadQuiz();
  }, [quizId]);


  // HERE?
  useEffect(() => {
    if (quizData !== null) {
      if (selectedAnswerIndex !== null) {
        console.log("Selected Index:", selectedAnswerIndex, typeof selectedAnswerIndex);
        console.log("Correct Index:", currentQuestion?.correctAnswerIndex, typeof currentQuestion?.correctAnswerIndex);
        if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
          setPoints((points) => points + 10);
          setAnswerStatus(true);
          answers.push({ question: index + 1, answer: true });
        } else {
          setAnswerStatus(false);
          answers.push({ question: index + 1, answer: false });
        }
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    if (quizData !== null) {
      setSelectedAnswerIndex(null);
      setAnswerStatus(null);
    }
  }, [index]);

  useEffect(() => {
    if (quizData !== null) {
      const myInterval = () => {
        if (counter >= 1) {
          setCounter((state) => state - 1);
        }
        if (counter === 0) {
          setIndex(index + 1);
          setCounter(100);
        }
      };

      interval = setTimeout(myInterval, 1000);

      // clean up
      return () => {
        clearTimeout(interval);
      };
    }
  }, [counter]);

  useEffect(() => {
    if (quizData !== null) {
      if (index + 1 > quizData.questions.length) {
        clearTimeout(interval)
        navigation.navigate("Results", {
          answers: answers,
          points: points,
        });
      }
    }
  }, [index]);

  useEffect(() => {
    if (quizData !== null) {
      if (!interval) {
        setCounter(100);
      }
    }
  }, [index]);

  const currentQuestion = quizData ? quizData.questions[index] : null;
  console.log(answerStatus)

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text>Quiz Challenge</Text>
        <Pressable
          style={{ padding: 10, backgroundColor: "magenta", borderRadius: 20 }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            {counter}
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text>Your Progress</Text>
        <Text>
          ({index}/{totalQuestions}) questions answered
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          height: 10,
          borderRadius: 20,
          justifyContent: "center",
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            backgroundColor: "#FFC0CB",
            borderRadius: 12,
            position: "absolute",
            left: 0,
            height: 10,
            right: 0,
            width: `${progressPercentage}%`,
            marginTop: 20,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 30,
          backgroundColor: "#F0F8FF",
          padding: 10,
          borderRadius: 6,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {currentQuestion?.question}
        </Text>
        <View style={{ marginTop: 12 }}>
          {currentQuestion?.options.map((item, optionIndex) => (
            <Pressable
              key={optionIndex}
              onPress={() =>
                selectedAnswerIndex === null && setSelectedAnswerIndex(optionIndex)
              }
              style={
                selectedAnswerIndex === optionIndex &&
                  optionIndex === currentQuestion.correctAnswerIndex
                  ? {
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#00FFFF",
                    marginVertical: 10,
                    backgroundColor: "green",
                    borderRadius: 20,
                  }
                  : selectedAnswerIndex != null &&
                    selectedAnswerIndex === optionIndex
                    ? {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#00FFFF",
                      marginVertical: 10,
                      backgroundColor: "red",
                      borderRadius: 20,
                    }
                    : {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#00FFFF",
                      marginVertical: 10,
                      borderRadius: 20,
                    }
              }
            >
              {selectedAnswerIndex === optionIndex &&
                optionIndex === currentQuestion.correctAnswerIndex ? (
                <AntDesign
                  style={{
                    borderColor: "#00FFFF",
                    textAlign: "center",
                    borderWidth: 0.5,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                  }}
                  name="check"
                  size={20}
                  color="white"
                />
              ) : selectedAnswerIndex != null &&
                selectedAnswerIndex === optionIndex ? (
                <AntDesign
                  style={{
                    borderColor: "#00FFFF",
                    textAlign: "center",
                    borderWidth: 0.5,
                    width: 40,
                    height: 40,
                    padding: 10,
                    borderRadius: 20,
                  }}
                  name="closecircle"
                  size={20}
                  color="white"
                />
              ) : (
                <Text
                  style={{
                    borderColor: "#00FFFF",
                    textAlign: "center",
                    borderWidth: 0.5,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  {optionLabels[optionIndex]}. {item}
                </Text>
              )}

              <Text style={{ marginLeft: 10 }}>{item}</Text>
            </Pressable>
          ))}
        </View>

      </View>

      <View
        style={
          answerStatus === null
            ? null
            : {
              marginTop: 45,
              backgroundColor: "#F0F8FF",
              padding: 10,
              borderRadius: 7,
              height: 120,
            }
        }
      >
        {answerStatus === null ? null : (
          <Text
            style={
              answerStatus == null
                ? null
                : { fontSize: 17, textAlign: "center", fontWeight: "bold" }
            }
          >
            {!!answerStatus ? "Correct Answer" : "Wrong Answer"}
          </Text>
        )}

        {index + 1 >= totalQuestions ? (
          <Pressable
            onPress={() =>
              navigation.navigate("Results", {
                points: points,

                answers: answers,
              })
            }
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Done</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable
            onPress={() => setIndex(index + 1)}
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Next Question</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
