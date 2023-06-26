import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    Button, TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';
import Header from './components/Header';
import Hero from './components/Hero';

const Onboarding = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const nameRegEx = /^[a-zA-Z]+$/;
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    useEffect(() => {
        if (nameRegEx.test(name) && emailRegEx.test(email)) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [name, email]);

    const handleSubmit = () => {
        if (isButtonDisabled) {
            Alert.alert('Error', 'Please enter valid name and email.');
            return;
        }
        Alert.alert('Success', 'You have successfully completed the onboarding process!');
    };

    return (
        <View style={styles.container}>
            <Header />
            <Hero />

            <View style={styles.form}>
                <Text style={styles.label}>Name*</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                />
                <Text style={styles.label}>Email*</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <TouchableOpacity
                    style={isButtonDisabled
                        ? styles.buttonDisabled
                        : styles.button}
                    onPress={handleSubmit}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    form: {
        padding: 20,
        width: '100%',
    },
    label: {
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.3)',
    },
    input: {
        height: 40,
        width: '100%',
        marginVertical: 10,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
    },
    buttonDisabled: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#EDEFEE',
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F4CE14',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#333333',
    },
});

export default Onboarding;
