import React, {useState} from "react";
import { View, Text, StyleSheet, Button, TextInput, Animated } from "react-native";

export default function CreateFlashCards(){
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flip, setFlip] = useState(false);

    const addFlashcard = () => {
        if (question.trim() === "" || answer.trim() === "") {
            return;
        }
        setFlashcards([...flashcards, {question, answer}]);
        setQuestion("");
        setAnswer("");
    };

    const flipFlashcard = () => {
        setFlip(!flip);
    };

    const nextFlashcard = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
    const previousFlashcard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
        return (
            <View style={styles.container}>

                <TextInput
                placeholder="Type question here"
                value={question} 
                style={[styles.textInput, {height: 100}]}
                onChangeText={(value) => setQuestion(value)}
                multiline={true}
                />

                <TextInput 
                placeholder="Type answer here" 
                value={answer}
                style={[styles.textInput, {height: 100}]} 
                onChangeText={(value) => setAnswer(value)} 
                multiline={true}
                />

                <Button title="Add Flashcard" onPress={addFlashcard} />
                {flashcards.length > 0 &&(
                    <View>
                        <Text>{flip ? "Answer" : "Question"}</Text>
                        <Text style = {styles.flashcardText}>
                            {flip ?
                            flashcards[currentIndex].answer :
                            flashcards[currentIndex].question}
                        </Text>
                        <Button title="Flip" onPress={flipFlashcard} color="#007AFF" />
                        <Button title="Next" onPress={nextFlashcard} color="#007AFF" />
                        <Button title="Previous" onPress={previousFlashcard} color="#007AFF" />
                    </View>
                )}
            </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // Center vertically
        alignItems: "center",     // Center horizontally
        padding: 20,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInput: {
        marginBottom: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%"
    },
    flashcardText: {
        fontSize: 18,
        textAlign: "center",
        marginVertical: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
      },
});
