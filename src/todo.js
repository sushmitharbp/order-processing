import React from 'react';
import './App.css';

// Functional component for TodoItem
const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <div className="todo-item">
      <span
        className={todo.completed ? 'completed' : ''}
        onClick={() => onToggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

// Class component for TodoList
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: '',
      filter: 'all',
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleAddTodo = () => {
    if (this.state.inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: this.state.inputValue,
        completed: false,
      };
      this.setState((prevState) => ({
        todos: [...prevState.todos, newTodo],
        inputValue: '',
      }));
    }
  };

  handleDeleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  };

  handleToggleComplete = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  getFilteredTodos() {
    const { todos, filter } = this.state;
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else if (filter === 'incomplete') {
      return todos.filter((todo) => !todo.completed);
    } else {
      return todos;
    }
  }

  render() {
    const filteredTodos = this.getFilteredTodos();
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Add a new todo"
        />
        <button onClick={this.handleAddTodo}>Add Todo</button>
        <div className="filters">
          <button onClick={() => this.handleFilterChange('all')}>All</button>
          <button onClick={() => this.handleFilterChange('completed')}>
            Completed
          </button>
          <button onClick={() => this.handleFilterChange('incomplete')}>
            Incomplete
          </button>
        </div>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onDelete={this.handleDeleteTodo}
                onToggleComplete={this.handleToggleComplete}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Functional component for TodoApp
const TodoApp = () => {
  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
};

export default TodoApp;
