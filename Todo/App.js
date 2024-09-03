import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet, Keyboard } from 'react-native';

// Banner component
function Banner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>ToDo example with React Native</Text>
    </View>
  );
}

// ToDoList component
function ToDoList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  const addToDoItem = () => {
    if (itemText !== '') {
      setItems([...items, { id: Math.random(), text: itemText }])
      setItemText('')
    }
    Keyboard.dismiss();
  }

  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  }

  return (
    <View>
      <View style={styles.addToDo}>
        <TextInput
          style={styles.addToDoTextInput}
          value={itemText}
          onChangeText={(text) => setItemText(text)}
          placeholder="Write a new todo here"
        />
        <Button
          title="Add"
          style={styles.addTodoButton}
          onPress={addToDoItem}
        />
      </View>
      <ScrollView style={styles.list}>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listItemText}> * {item.text}</Text>
            <Text
              style={styles.listItemDelete}
              onPress={() => removeItem(item.id)}
            >
              X
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// App component
export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5,
    backgroundColor: '#ecf0f1',
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18,
  },
  addToDo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3498db',
  },
  addToDoTextInput: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  addTodoButton: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    marginLeft: 5,
  },
  list: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ecf0f1',
    height: 200,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  listItemText: {},
  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
