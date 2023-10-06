import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { printAsync } from 'expo-print';
import * as FileSystem from 'expo-file-system';

export default function CreateFlashCards(){
    let [name, setName] = useState("");
        const html = `
        <html>
        <body>
            <h1>Hi ${name}</h1>
            <p style="color: red;">Hello. </p>
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
              };
        return (
            <View style={styles.container}>
                <TextInput value={name} placeholder="Type here" style={styles.textInput} onChangeText={(value) => setName(value)} />
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
        margin: 8
    }
});

