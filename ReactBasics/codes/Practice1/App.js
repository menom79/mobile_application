// Import React and useState from react library
import React, { useState } from 'react';
// Import needed UI elements
import { Text, View, StyleSheet, Button } from 'react-native';
// Import constrants from expo
import Constants from 'expo-constants';

// default application, which will be launched
export default function App() {
  // count state-variable using Hooks
  // default value is 0, can be modified
  // with setCount function
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  // create a View with few elements and 
  // add onPress event handling to buttons
  return (
    <View style={styles.container}>
      <Text>Value is {count}</Text>
      <View style={styles.buttonView}>
        <Button
          title="Increase"
          onPress={increaseCount}
          color={count >= 10 ? 'gray' : 'green'}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Decrease"
          onPress={decreaseCount}
          color={count <= -10 ? 'gray' : 'red'}
        />
      </View>
    </View>
  );
}

// Define styles for container and buttonView
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  buttonView: {
    marginVertical: 10,
  },
});
