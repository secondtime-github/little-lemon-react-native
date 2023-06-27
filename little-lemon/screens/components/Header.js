import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ showAvatar = false }) => {
    const navigation = useNavigation();

    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.header}>
            <View style={styles.placeholder} />
            <Image
                style={styles.logo}
                source={require('../../assets/Logo.png')}
                resizeMode='contain'
            />
            {showAvatar ? (
                <TouchableOpacity onPress={goToProfile}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/Profile.png')}
                        resizeMode='stretch'
                    />
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholder} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        // paddingTop: 50,
        width: '100%',
        backgroundColor: '#EDEFEE',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 60,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    placeholder: {
        width: 50,
        height: 50,
    },
});

export default Header;
