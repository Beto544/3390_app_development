import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Login() {
    
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const handleSubmit = async () => {

        if(name === ' ' || email === ' ' || password === ' '){
            alert("All fields are required");
            return;
        }
        try {
            const response = await axios.post("https://us-west-2.aws.data.mongodb-api.com/app/data-akiyk/endpoint/data/v1/api/user/signin", {
                name: name,
                email: email,
                password: password
            });
            
            const token = response.data.user?.token;
            const user = response.data.user?.id;

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('UserId', user)

            alert("Logged in successfully!");


        } catch (error) {
            console.error(error);
            alert("Login failed. Please check your credentials.");
        }
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Login</Text>
            </View>
            <View style={styles.text2}>
                <Text> Don't have an Account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
            </View>
            {/* Username */}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input value={name} onChangeText={text => SetName(text)}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="user-secret" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: 'black',
                                }}

                                _dark={{
                                    color: "gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="Username"
                        _light={{
                            placeholderTextColor: "blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}

                    />
                </View>
            </View>
            {/* Email Input Field */}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input  value={email} onChangeText={text => SetEmail(text)}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="user-secret" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: 'black',
                                }}

                                _dark={{
                                    color: "gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="Email"
                        _light={{
                            placeholderTextColor: "blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}

                    />
                </View>
            </View>

            {/* Password Input Field */}
            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input  value={password} onChangeText={text => SetPassword(text)}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="key" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: "black"
                                }}
                                _dark={{
                                    color: "gray.300"
                                }}
                            />
                        }
                        variant="outline"
                        secureTextEntry={true}
                        placeholder="Password"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50"
                        }}
                    />

                </View>
            </View>


            {/* Button */}
            <View style={styles.buttonContainer}>
                <Button style={styles.buttonDesign} onPress={handleSubmit}>
                    LOGIN
                </Button>
            </View>
            {/* Line */}

            <View style={styles.lineStyle}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
        </View>

    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Login />

        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center', // Center the content horizontally
    },
    buttonDesign: {
        backgroundColor: '#026efd',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    LoginText: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: 'bold',
    },
    Middle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text2: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5
    },
    signupText: {
        fontWeight: 'bold'
    },
    emailInput: {
        marginTop: 10,
        marginRight: 5

    },
    buttonStyle: {
        marginTop: 30,
        maringLeft: 15,
        marginRight: 15
    },
    buttonStyleX: {
        marginTop: 12,
        maringLeft: 15,
        marginRight: 15
    },
    buttonDesign: {
        backgroundColor: '#026efd'
    },
    lineStyle: {
        flexDirections: 'row',
        mariginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center',
    },

})