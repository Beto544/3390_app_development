// HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation(); // Initialize navigation

    return (
        <View style={{ marginTop: 15 }}>
        <View>
             <Text>Welcome!</Text>
             <Image style={{ height: 370, width: "100%", resizeMode: "contain" }}
                source={require('../assets/Quiz.png')}
            />
        </View>
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


