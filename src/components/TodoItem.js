// @ts-check

import React from 'react';

import './TodoItem.css';
import { ContextItemsArchive } from '../contexts/TodoItemsContext';;


const TodoItem = ( { todo } ) => (
  <li className="TodoItem">

    <span>{ todo.text }</span>

    {/* TODO: implement other buttons/functions (delete, unarchive, finish) */}

    <ContextItemsArchive.Consumer>
      { (fnArchiveTodo) => (
        <button onClick={ () => { fnArchiveTodo( todo.id ) } }>
          Archive
        </button>
      )}
    </ContextItemsArchive.Consumer>

  </li>
);


export default TodoItem;