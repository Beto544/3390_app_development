import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

function Login() {
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
            <View style={styles.text2}>
                <Text> Skip Login? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <Text style={styles.signupText}>Skip</Text>
                </TouchableOpacity>
            </View>
            {/* Username or Email Input Field */}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input
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
                    <Input
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
                <Button style={styles.buttonDesign}>
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