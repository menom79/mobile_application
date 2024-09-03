import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState('0');
  const [number2, setNumber2] = useState('0');
  const [result, setResult] = useState('0');

  const calcSum = () => {
    const sum = parseFloat(number1) + parseFloat(number2);
    setResult(sum.toString());
  };

  const calcSubtraction = () => {
    const difference = parseFloat(number1) - parseFloat(number2);
    setResult(difference.toString());
  };

  const calcMultiplication = () => {
    const product = parseFloat(number1) * parseFloat(number2);
    setResult(product.toString());
  };

  const calcDivision = () => {
    const quotient = parseFloat(number1) / parseFloat(number2);
    setResult(quotient.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.calculator}>Calculator</Text>

      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 1:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={number1}
            onChangeText={text => setNumber1(text)}
            style={{ textAlign: 'right' }}
            keyboardType={'numeric'}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 2:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={number2}
            onChangeText={text => setNumber2(text)}
            style={{ textAlign: 'right' }}
            keyboardType={'numeric'}
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={calcSum}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={calcSubtraction}>
          <Text>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={calcMultiplication}>
          <Text>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={calcDivision}>
          <Text>/</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Result:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="0"
            value={result}
            style={{ textAlign: 'right' }}
            editable={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculator: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    padding: 5,
    width: 100,
  },
  textInput: {
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1.0,
    width: 100,
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: 220,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
