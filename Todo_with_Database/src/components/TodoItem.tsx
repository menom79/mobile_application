import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {TodoType} from '../realm';

interface TodoItemProps {
  idx: number;
  todo: TodoType;
  doTodo: (id: string, todo: TodoType) => void;
  undoTodo: (id: string, todo: TodoType) => void;
  removeTodo: (id: string) => void;
}

const TodoItem = ({
  todo,
  doTodo,
  undoTodo,
  removeTodo,
  idx,
}: TodoItemProps): JSX.Element => {
  return (
    <View style={styles.todoItemContainer}>
      <Text
        style={[styles.todoItemText, todo.isDone ? styles.todoDoneText : {}]}>
        {idx + 1}. {todo.title}
      </Text>
      <View style={styles.todoItemActions}>
        <Button
          title="✓"
          {...(todo.isDone ? {color: 'grey'} : {color: 'green'})}
          onPress={() =>
            todo.isDone ? undoTodo(todo._id, todo) : doTodo(todo._id, todo)
          }
        />
        <Button title="𐄂" color="red" onPress={() => removeTodo(todo._id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItemContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  todoItemActions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  todoItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#20232a',
    flexShrink: 1,
  },
  todoDoneText: {
    textDecorationLine: 'line-through',
  },
  todoItemBtn: {
    borderRadius: 4,
    padding: 8,
    width: 30,
  },
});

export default TodoItem;
