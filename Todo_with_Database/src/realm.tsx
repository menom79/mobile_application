import Realm, {UpdateMode} from 'realm';
import uuid from 'react-native-uuid';

export interface TodoType {
  _id: string;
  title: string;
  isDone: boolean;
}

// Declare Schema
class TodoSchema extends Realm.Object {}
TodoSchema.schema = {
  name: 'Todo',
  properties: {
    _id: 'string',
    title: 'string',
    isDone: 'bool',
  },
  primaryKey: '_id',
};

// Create realm
let realm = new Realm({schema: [TodoSchema], schemaVersion: 4});

// Functions for TodoSchema
export const getAllTodos = () => {
  let res = realm.objects<TodoSchema[]>('Todo');
  return res ? res : [];
};

export const deleteAllTodos = () => {
  realm.write(() => {
    realm.delete(getAllTodos());
  });
};

export const addTodo = (title: string) => {
  realm.write(() => {
    realm.create('Todo', {
      _id: uuid.v4(),
      title: title,
      isDone: false,
    });
  });
};

export const updateTodo = (_id: string, title: string, isDone: boolean) => {
  realm.write(() => {
    realm.create(
      'Todo',
      {
        _id: _id,
        title: title,
        isDone: isDone,
      },
      'modified',
    );
  });
};

export const deleteTodo = (_id: string) => {
  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey('Todo', _id));
  });
};

// Export the realm
export default realm;
