import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
      <ScrollView horizontal>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(index);
            }}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              marginRight: 8,
              borderRadius: 25,
              backgroundColor: selections[index] ? '#495E57' : '#FBDABB',
            }}>
            <View>
              <Text style={{ color: selections[index] ? '#EDEFEE' : '#495E57' }}>
                {section}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEFEE',
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Filters;
