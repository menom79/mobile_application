import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';

import TodoItem from './TodoItem';

import {updateTodo, deleteTodo, TodoType, getAllTodos} from '../realm';

interface TodoListProps {
  todos: TodoType[];
  updateTodoList: (todos: TodoType[]) => void;
}

const TodoList = ({todos, updateTodoList}: TodoListProps): JSX.Element => {
  const doTodo = (id: string, todo: TodoType) => {
    updateTodo(id, todo.title, true);
    updateTodoList(getAllTodos());
  };
  const undoTodo = (id: string, todo: TodoType) => {
    updateTodo(id, todo.title, false);
    updateTodoList(getAllTodos());
  };
  const removeTodo = (id: string) => {
    deleteTodo(id);
    updateTodoList(getAllTodos());
  };

  return (
    <ScrollView style={styles.todoList}>
      {todos.length === 0 && (
        <Text style={styles.todoItemText}>No todos in your todo list</Text>
      )}
      {todos.map((todo, idx) => {
        return (
          <TodoItem
            key={todo._id}
            todo={todo}
            idx={idx}
            doTodo={doTodo}
            undoTodo={undoTodo}
            removeTodo={removeTodo}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 10,
    gap: 10,
  },
  todoItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#20232a',
    flexShrink: 1,
  },
});

export default TodoList;
