// @ts-check

import React from 'react';

import './TodosList.css';
import TodoItem from './TodoItem';


const TodosList = ( props ) => (
  <div className="TodosList">

    { generateTodos( props.todos, props.fnArchiveTodo ) }

  </div>
);


const generateTodos = function generateTodos( todos, fnArchiveTodo ) {
  if ( todos.length === 0 ) {
    return <em>Aucune tâche</em>;
  }

  const markup = todos.map( (todo) => (
    <TodoItem
      key={ todo.id }
      todo={ todo }
      fnArchiveTodo={ fnArchiveTodo }
    />
  ));

  return <ul>{ markup }</ul>;
};


export default TodosList;