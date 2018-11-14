import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledList,
  StyledEmptyList,
} from './ListStyledComponents';

import TodoItem from '../TodoItem';


/**
 * Component's function
 *
 * @param {Object} props - Component's props
 * @param {Array} props.todos - List of todos
 * @return {JSX.Element}
 */
const TodosList = ( { todos } ) => (

  todos.length === 0

    ? <StyledEmptyList>
        This list is empty
      </StyledEmptyList>

    : <StyledList>
        { generateTodos( todos ) }
      </StyledList>
);


/**
 * Create the list of todos or a text if the list is empty
 *
 * @param {Array} todos - List of todos
 * @return {Array} List of generated todos
 */
const generateTodos = function generateTodos( todos ) {
  return todos.map( todo => (
    <TodoItem
      key={ todo.id }
      todo={ todo }
    />
  ));
};


// Component's default props
TodosList.defaultProps = {
  todos: [],
};


// Component props typechecking
TodosList.propTypes = {
  todos: PropTypes.arrayOf( PropTypes.object ),
};


export default TodosList;