import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const Hero = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.title}>Little Lemon</Text>
            <View style={styles.container}>
                <View style={styles.main}>
                    <Text style={styles.subtitle}>Chicago</Text>
                    <Text style={styles.description}>
                        We are a family owned Mediterranean restaurant,
                        focused on traditional recipes served with a modern twist.
                    </Text>
                </View>
                <Image
                    style={styles.image}
                    source={require('../assets/Hero_image.png')}
                    resizeMethod='contain'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        padding: 20,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#495E57'
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#F4CE14',
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 160,
    },
    main: {
        width: '60%',
        height: '100%',
        justifyContent: 'space-between',
    },
    subtitle: {
        fontSize: 32,
        color: '#EDEFEE',
    },
    description: {
        fontSize: 16,
        color: '#EDEFEE',
    },
    image: {
        width: 144,
        height: 144,
        borderRadius: 15,
    }
});

export default Hero;