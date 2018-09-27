import React from 'react';
import PropTypes from 'prop-types';

import { StyledWrapper, StyledInput } from './StyledComponents';


// we could have used `PureComponent` instead of `Component` to take advantage
// of the (native) implementation of `shouldComponentUpdate()` for a shallow
// comparison for props and state and avoid unnecessary re-renders,
// but this whould have prevented the execute of `componentDidUpdate()`
class TodoInput extends React.Component {

  state = {
    todoText: '', // current value of the <input>
  };


  // Create a ref to store the textInput DOM element
  // See : https://reactjs.org/docs/refs-and-the-dom.html
  // __ I keep this here (even if `= null`) just to
  // __ remember the class has this static property
  textInput = null; // = React.createRef(); // native use of `ref` for React


  /** React lifecycle method */
  componentDidUpdate = () => {
    // console.log( 'TodoInput did update' );
    // each time the component is rendered, keep the focus
    // don't do this in componentDidMount() : the <input> has the autoFocus attribute
    this.focusTextInput();
  };


  /** Focus the text input */
  focusTextInput = () => {
    // console.log( 'TodoInput.focusTextInput()' );
    // Focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.focus(); // `ref` use for styled-component
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
    this.props.fnAddTodo( todoToAdd );

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
    // console.log( 'TodoInput render()' );
    return (
      <StyledWrapper>

        <form onSubmit={ this.handleFormSubmit }>
          <StyledInput
            type="text"
            placeholder="Save a new task"
            autoFocus
            onChange={ this.handleInputChange }
            value={ this.state.todoText }

            // Tell React that we want to associate the <input> ref
            // with the `textInput` that we created before
            //
            // styled-components (v3 and lower) uses of the prop `innerRef`
            // See : https://www.styled-components.com/docs/advanced#refs
            // TODO : update `innerRef` prop to `ref` when styled-components gets upgraded to v4
            innerRef={ ( elem ) => { this.textInput = elem } }
          />
        </form>

      </StyledWrapper>
    );
  }
}


// Component's default props
TodoInput.defaultProps = {
  fnAddTodo() {
    console.warn( 'TodoInput.props.fnAddTodo() does not exist.' );
  },
};


// Component props typechecking
TodoInput.propTypes = {
  fnAddTodo: PropTypes.func.isRequired,
};


export default TodoInput;