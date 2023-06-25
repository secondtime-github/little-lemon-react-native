import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image
                style={styles.logo}
                source={require('../assets/Logo.png')}
                resizeMode='contain'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEFEE',
    },
    logo: {
        width: 180,
        height: 60,
    }
});

export default Header;
