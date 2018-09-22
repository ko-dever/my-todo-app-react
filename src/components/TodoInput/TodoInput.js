// @ts-check

import React from 'react';


class TodoInput extends React.Component {

  state = {
    todoText: '', // text of the todo to add
  };


  /** Action when the form is submitted */
  handleFormSubmit = ( event ) => {
    event.preventDefault(); // prevent form submit

    const todoToAdd = this.state.todoText;

    if ( todoToAdd === '' ) {
      return;
    }

    // execute the function passed in the props
    // by the component which controls this one
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


  render() {
    console.log( 'TodoInput render()' );
    return (
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
}

export default TodoInput;