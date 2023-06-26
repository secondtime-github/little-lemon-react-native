import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import Hero from './components/Hero';
import { LoginContext } from './components/LoginContext';

const Onboarding = ({ route }) => {
    const { login, setLogin } = useContext(LoginContext);
    
    const [info, setInfo] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        orderStatuses: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false,
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const nameRegEx = /^[a-zA-Z]+$/;
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    useEffect(() => {
        if (nameRegEx.test(info.name) && emailRegEx.test(info.email)) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [info.name, info.email]);

    const submit = async () => {
        try {
            await AsyncStorage.setItem('@login_key', JSON.stringify(true));
            await AsyncStorage.setItem('@info_key', JSON.stringify(info));
            await setLogin(true);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <Hero />

            <View style={styles.form}>
                <Text style={styles.label}>Name*</Text>
                <TextInput
                    style={styles.input}
                    value={info.name}
                    onChangeText={text => setInfo({ ...info, name: text })}
                    placeholder="Enter your name"
                />
                <Text style={styles.label}>Email*</Text>
                <TextInput
                    style={styles.input}
                    value={info.email}
                    onChangeText={text => setInfo({ ...info, email: text })}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <TouchableOpacity
                    style={isButtonDisabled
                        ? styles.buttonDisabled
                        : styles.button}
                    onPress={submit}
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
