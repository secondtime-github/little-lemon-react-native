import React, { useState, useEffect, useContext } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import Checkbox from './components/Checkbox';
import { LoginContext } from './components/LoginContext';

const Profile = () => {
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

    useEffect(() => {
        discardChanges();
    }, []);

    const saveChanges = async () => {
        try {
            await AsyncStorage.setItem('@info_key', JSON.stringify(info));
        } catch (e) {
            console.error(e);
        }
    }

    const discardChanges = async () => {
        try {
            const value = await AsyncStorage.getItem('@info_key');
            if (value !== null) {
                setInfo(JSON.parse(value));
            }
        } catch (e) {
            console.error(e);
        }
    }

    const logout = async () => {
        setLogin(false);
        try {
            await AsyncStorage.clear()
            await AsyncStorage.setItem('@login_key', JSON.stringify(false));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <ScrollView>
            <Header />
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Personal information</Text>
                    <Text style={styles.label}>Avatar</Text>
                    <View style={styles.avatar}>
                        <Image
                            style={styles.image}
                            source={require('../assets/Profile.png')}
                            resizeMode='stretch'
                        />
                        <TouchableOpacity
                            style={styles.changeButton}
                            onPress={() => { }}
                        >
                            <Text style={styles.buttonTextLight}>Change</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => { }}
                        >
                            <Text style={styles.buttonTextDark}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={info.name}
                        onChangeText={text => setInfo({ ...info, name: text })}
                        placeholder="Enter your name"
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={info.email}
                        onChangeText={text => setInfo({ ...info, email: text })}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput
                        style={styles.input}
                        value={info.phoneNumber}
                        onChangeText={text => setInfo({ ...info, phoneNumber: text })}
                        placeholder="Enter your phone number"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Email notifications</Text>
                    <Checkbox
                        label="Order statuses"
                        checked={info.orderStatuses}
                        onChange={c => setInfo({ ...info, orderStatuses: c })}
                    />
                    <Checkbox
                        label="Password changes"
                        checked={info.passwordChanges}
                        onChange={c => setInfo({ ...info, passwordChanges: c })}
                    />
                    <Checkbox
                        label="Special offers"
                        checked={info.specialOffers}
                        onChange={c => setInfo({ ...info, specialOffers: c })}
                    />
                    <Checkbox
                        label="Newsletter"
                        checked={info.newsletter}
                        onChange={c => setInfo({ ...info, newsletter: c })}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={logout}
                    >
                        <Text style={styles.buttonTextDark}>Log out</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.discardButton}
                            onPress={discardChanges}
                        >
                            <Text style={styles.buttonTextDark}>Discard changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={saveChanges}
                        >
                            <Text style={styles.buttonTextLight}>Save changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15,
    },
    section: {
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.3)',
    },
    input: {
        height: 40,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
    },
    changeButton: {
        backgroundColor: '#495E57',
        borderRadius: 10,
        height: 40,
        width: 80,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButton: {
        borderColor: '#495E57',
        borderWidth: 1,
        height: 40,
        width: 80,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#F4CE14',
        borderRadius: 10,
        paddingVertical: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#495E57',
        borderRadius: 10,
        paddingVertical: 15,
        minWidth: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    discardButton: {
        borderColor: '#495E57',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        minWidth: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextLight: {
        color: '#EDEFEE',
    },
    buttonTextDark: {
        color: '#333333',
    },
});

export default Profile;