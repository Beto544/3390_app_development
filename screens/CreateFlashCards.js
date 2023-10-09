import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { printAsync } from 'expo-print';
import * as FileSystem from 'expo-file-system';

export default function CreateFlashCards(){
    let [name, setName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

        const html = `
        <html>
        <body>
            <h1>Flashcard</h1>
            <p>Question: ${question}</p>
            <p>Answer: ${answer}</p>
                </body>
            </html>
            `;
            //let GeneratePdf = async() => {
            //    const file = await printToFileAsync({
            //        html: html,
            //        base64: false
            //    });
            //    await shareAsync(file.uri);
            //};
            let GeneratePdf = async () => {
                const file = await printAsync({
                  html: html,
                });
                await shareAsync(file.uri);
              };
        return (
            <View style={styles.container}>
                <TextInput value={question} 
                placeholder="Type question here" 
                style={styles.textInput} 
                onChangeText={(value) => setQuestion(value)}
                multiline={true}
                numberOfLines={4} />
                <TextInput value={answer} 
                placeholder="Type answer here" 
                style={styles.textInput} 
                onChangeText={(value) => setAnswer(value)} />
                <Button title="Generate PDF" onPress={GeneratePdf}/>
                <StatusBar style="auto" />
            </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // Center vertically
        alignItems: "center",     // Center horizontally
    },
    textInput: {
        alignSelf: "stretch",
        padding: 8,
        margin: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        fontSize: 16,
    }
});
