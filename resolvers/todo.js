const todos = require('../data');

class TodoResolver {
  getAll() {
    return todos;
  }

  find(_, { title }) {
    return todos.find(todo => todo.title === title);
  }

  add(_, { ...rest }) {
    todos.push(rest);
    return rest;
  }

  update(_, { title, ...rest }) {
    const index = todos.findIndex(todo => todo.title === title);
    if (index < 0) {
      return null;
    }
    todos[index] = {
      title,
      ...rest
    };

    return todos[index];
  }

  delete(_, { title }) {
    const index = todos.findIndex(todo => todo.title === title);
    if (!todo) {
      return null;
    }
    const todo = todos[index];
    todos.splice(index, 1);
    return todo;
  }
}

module.exports = TodoResolver;