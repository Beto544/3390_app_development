import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function TakeQuiz() {
    const navigation = useNavigation(); // Initialize navigation

    return (
        <View style={{ marginTop: 15 }}>
            <Image style={{ height: 370, width: "100%", resizeMode: "contain" }}
                source={require('../assets/Quiz.png')}
            />

            <View style={{ padding: 10 }}>
                <Text style={{ textAlign: "center", color: "black", fontSize: 20 }}>Quiz Rules</Text>

                <View style={{ padding: 10, backgroundColor: "#ADD8E6", borderRadius: 6, marginTop: 15 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "black" }}>*</Text>
                        <Text style={{ marginLeft: "722F37", fontSize: 15, fontWeight: "500" }}> Answer Questions</Text>

                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "black" }}>*</Text>
                        <Text style={{ marginLeft: "722F37", fontSize: 15, fontWeight: "500" }}> R1.</Text>
                    </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "black" }}>*</Text>
                    <Text style={{ marginLeft: "722F37", fontSize: 15, fontWeight: "500" }}> R2.</Text>
                </View>
            </View>
            </View>


        <Pressable style ={{
            backgroundColor:"green",
            padding:14,
            width: 120,
            borderRadius:25, 
            marginLeft:"auto", 
            marginRight:"auto",
            marginTop:30
            }}
            >
            <Text style={{color:"white", fontWeight:"600", textAlign:"center"}}>Start Quiz</Text>
        </Pressable>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


