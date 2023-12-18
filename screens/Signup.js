import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

function Login() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://192.168.1.155:8000/api/user/create",
                { name, email, password },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            console.log(response.data);
            setError(""); // Clear any previous errors
            alert("Signed up successfully!");
        } catch (error) {
            console.error("Axios error", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.middle}>
                <Text style={styles.loginText}>Register</Text>
            </View>

            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        value={name}
                        onChangeText={text => setName(text)}
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
                        placeholder="Username"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50"
                        }}
                    />
                </View>
            </View>

            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        value={email}
                        onChangeText={text => setEmail(text)}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="envelope" />}
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
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50"
                        }}
                    />
                </View>
            </View>

            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        value={password}
                        onChangeText={text => setPassword(text)}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="lock" />}
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

            <View style={styles.buttonContainer}>
                <Button
                    style={styles.buttonDesign}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        "Sign Up"
                    )}
                </Button>
            </View>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
        </View>
    );
}

export default () => {
    return (
        <NativeBaseProvider>
            <Login />
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    buttonDesign: {
        backgroundColor: '#026efd',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    loginText: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailInput: {
        marginTop: 10,
        marginRight: 5,
    },
    buttonStyleX: {
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});
