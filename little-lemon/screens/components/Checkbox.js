import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Checkbox = ({ label, checked, onChange }) => {
  const toggleCheckbox = () => {
    onChange(!checked);
  };

  return (
    <TouchableOpacity style={styles.checkbox} onPress={toggleCheckbox}>
      {
        checked
          ? <View style={styles.checked}>
            <Text style={styles.mark}>✓</Text>
          </View>
          : <View style={styles.unChecked}></View>
      }
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  checked: {
    backgroundColor: '#495E57',
    borderRadius: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unChecked: {
    borderColor: '#495E57',
    borderWidth: 1,
    borderRadius: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mark: {
    color: '#EDEFEE',
    fontWeight: 'bold',
  },
  label: {
    color: '#333333',
    marginLeft: 10,
  },
});

export default Checkbox;
