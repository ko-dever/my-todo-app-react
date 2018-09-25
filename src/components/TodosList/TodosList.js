import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TodoItem from '../TodoItem';


const StyledList = styled.div`
  margin-top: 20px;
`;


const TodosList = ( { todos } ) => (
  <StyledList>

    { generateTodos( todos ) }

  </StyledList>
);


const generateTodos = function generateTodos( todos ) {
  if ( todos.length === 0 ) {
    return <em>Aucune tâche</em>;
  }

  const markup = todos.map( (todo) => (
    <TodoItem
      key={ todo.id }
      todo={ todo }
    />
  ));

  return <ul>{ markup }</ul>;
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