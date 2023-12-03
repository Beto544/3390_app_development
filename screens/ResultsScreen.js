// ResultsScreen.js

import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const handleContinue = () => {
    // Reset the quiz state
    //resetQuizState(points, index, answerStatus, answers, selectedAnswerIndex, counter);

    // Navigate back to the QuizScreen
    navigation.navigate("HomeScreen");
  };
  // console.log(route.params);
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Your Results</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <Text>Share</Text>
          <AntDesign
            style={{ marginLeft: 4 }}
            name="sharealt"
            size={18}
            color="black"
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text>Questions Answered</Text>
        <Text>(5/5)</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "white",
          height: 220,
          borderRadius: 7,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "magenta",
            fontSize: 15,
            fontWeight: "500",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Score Card
        </Text>
        <FlatList
          numColumns={2}
          data={route.params.answers}
          renderItem={({ item, i }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: 10,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <Text>{item.question}</Text>
              {item.answer === true ? (
                <AntDesign style={{ marginLeft: 5 }} name="checkcircle" size={20} color="green" />
              ) : (
                <AntDesign style={{ marginLeft: 5 }} name="closecircle" size={20} color="red" />
              )}
            </View>
          )}
        />

        <Pressable
          style={{
            backgroundColor: "green",
            padding: 8,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 20,
            borderRadius: 5,
          }}
          onPress={handleContinue} // Call handleContinue when the button is pressed
        >
          <Text style={{ color: "white", textAlign: "center" }}>Continue</Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export const resetQuizState = (setPoints, setIndex, setAnswerStatus, setAnswers, setSelectedAnswerIndex, setCounter) => {
  setPoints(0);
  setIndex(0);
  setAnswerStatus(null);
  setAnswers([]);
  setSelectedAnswerIndex(null);
  setCounter(100);
};

export default ResultsScreen;

const styles = StyleSheet.create({});
