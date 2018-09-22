// @ts-check

import React from 'react';


class TodoInput extends React.Component {

  state = {
    todoText: '', // current value of the <input>
  };

  // create a ref to store the textInput DOM element
  // https://reactjs.org/docs/refs-and-the-dom.html
  textInput = React.createRef();


  /** React lifecycle method */
  componentDidUpdate = () => {
    console.log( 'TodoInput did update' );
    // each time the component is rendered, keep the focus
    // no need to do this in componentDidMount() : the <input> has the autoFocus attribute
    this.focusTextInput();
  };


  /** Focus the text input */
  focusTextInput = () => {
    console.log( 'TodoInput.focusTextInput()' );
    // Focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
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

            // tell React that we want to associate the <input> ref
            // with the `textInput` that we created before
            ref={ this.textInput }
          />
        </form>

      </div>
    );
  }
}

export default TodoInput;