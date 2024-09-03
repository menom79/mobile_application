import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  TextInput,
  Button,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import realm, {
  TodoType,
  getAllTodos,
  addTodo as realmAddTodo,
  deleteAllTodos,
} from './src/realm';

import Banner from './src/components/Banner';
import TodoList from './src/components/TodoList';

export default function App() {
  const [todos, setTodos] = useState<TodoType>([]);
  const [newTodoText, setNewTodoText] = useState('');
  console.log(JSON.stringify(todos, null, 2))

  useEffect(() => {
    setTodos(getAllTodos());
  }, []);

  const addTodo = () => {
    if (newTodoText.trim() === '') {
      return;
    }
    realmAddTodo(newTodoText);
    setTodos(getAllTodos());
    setNewTodoText('');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Banner title="Todo app" />
        <View style={styles.newTodoContainer}>
          <TextInput
            style={styles.newTodoInput}
            onChangeText={text => setNewTodoText(text)}
            value={newTodoText}
          />
          <Button color="green" title="Add" onPress={addTodo} />
        </View>
        <TodoList todos={todos} updateTodoList={setTodos} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
    gap: 8,
  },
  newTodoContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 10,
  },
  newTodoInput: {
    borderRadius: 3,
    padding: 5,
    borderWidth: 2,
    borderColor: '#20232a',
    flex: 1,
  },
});
