import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [numbers, setNumbers] = useState([]);

  const addNumber = () => {
    setNumbers([...numbers, Math.random()]);
  }

  return (
    <View style={styles.container}>
      <Button title="Randomize" onPress={addNumber}/>
      <ScrollView style={styles.scrollView}>
        {
          numbers.map((item, index) => (
            <View key={index} style={styles.numberContainer}>
              <Text style={styles.numberText}>{item}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  scrollView: {
    marginVertical: 10,
  },
  numberContainer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  numberText: {
    fontSize: 16,
  },
});
