import React from 'react';
import PropTypes from 'prop-types';

import { StyledWrapper, StyledInput } from './StyledComponents';


// we could have used `React.PureComponent` instead of `React.Component` to take advantage
// of the (native) implementation of `shouldComponentUpdate()` for a shallow
// comparison for props and state and avoid unnecessary re-renders,
// but this whould have prevented the execution of `componentDidUpdate()`
class TodoInput extends React.Component {

  // Create a ref to store the textInput DOM element
  // See : https://reactjs.org/docs/refs-and-the-dom.html
  // __ I keep this here (even if `= null`) just to
  // __ remember the class has this static property
  textInput = null; // = React.createRef(); // native use of `ref` for React


  /**
   * Invoked immediately after updating occurs, but not called for the initial render.
   * If `.setState()` called here, wrap it in a condition or it will create an infinite loop.
   */
  componentDidUpdate = () => {
    // each time the component is rendered, keep the focus.
    // don't call this in componentDidMount() : the <input> already has the autoFocus attribute
    this.focusTextInput();
  };


  /** Trigger the focus on the text input */
  focusTextInput = () => {
    this.textInput.focus(); // `ref` use for styled-component
  };


  /**
   * Action when the form is submitted
   *
   * @param {SyntheticEvent} event - Event's object
   */
  handleFormSubmit = ( event ) => {
    event.preventDefault(); // prevents the submission

    const todoToAdd = this.textInput.value.trim();

    if ( todoToAdd === '' ) {
      return;
    }

    // execute the function passed in the props
    // by the component which controls this one
    this.props.fnAddTodo( todoToAdd );

    // todo added => we can clear the input
    this.textInput.value = '';
  };


  /**
   * Component's render function
   *
   * @return {JSX.Element}
   */
  render() {
    return (
      <StyledWrapper>

        <form onSubmit={ this.handleFormSubmit }>
          <StyledInput
            type="text"
            placeholder="Save a new task"
            autoFocus

            // Tell React that we want to associate the <input> ref
            // with the `textInput` that we created before
            //
            // styled-components (v3 and lower) uses of the prop `innerRef`
            // See : https://www.styled-components.com/docs/advanced#refs
            // TODO: update `innerRef` prop to `ref` when styled-components gets upgraded to v4
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