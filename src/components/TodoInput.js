// @ts-check

import React from 'react';

import './TodoInput.css';


class TodoInput extends React.Component {

  state = {
    // text of the todo to add
    todoText: '',
  };


  /** Action when the form is submitted */
  handleFormSubmit = ( event ) => {
    event.preventDefault(); // prevent form submit

    const todoToAdd = this.state.todoText;

    if ( todoToAdd === '' ) {
      return;
    }

    // execute the function passed by the component which controls this one
    this.props.fnAddTodo( todoToAdd )

    // update private state
    // once we passed the text of the todo, we can clear the input
    this.setState({ todoText: '' });
  };


  /** When something is typed in the <input> */
  handleInputChange = ( event ) => {
    // keep private state synced with the value of the input
    this.setState({ todoText: event.target.value });
  };


  render = () => (
    <div className="TodoInput">

      <form onSubmit={ this.handleFormSubmit }>
        <input
          type="text"
          className="TodoInput-input"
          placeholder="Enregistrer une nouvelle tâche"
          autoFocus
          onChange={ this.handleInputChange }
          value={ this.state.todoText }
        />
      </form>

    </div>
  );
}

export default TodoInput;