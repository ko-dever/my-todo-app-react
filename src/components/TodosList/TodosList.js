// @ts-check

import React from 'react';

import TodoItem from '../TodoItem';


const TodosList = ( { todos } ) => (
  <div className="TodosList">

    { generateTodos( todos ) }

  </div>
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