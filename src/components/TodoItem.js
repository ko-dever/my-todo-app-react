// @ts-check

import React from 'react';
import './TodoItem.css';


const TodoItem = ( { todo, fnArchiveTodo } ) => (
  <li className="TodoItem">

    <span>{ todo.text }</span>

    {/* TODO: implement other buttons/functions (delete, unarchive, finish) */}

    <button onClick={ () => { fnArchiveTodo( todo.id ) } }>
      Archive
    </button>

  </li>
);


export default TodoItem;