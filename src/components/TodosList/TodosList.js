import React from 'react';
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


export default TodosList;