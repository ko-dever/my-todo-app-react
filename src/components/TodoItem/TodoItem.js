// @ts-check

import React from 'react';

import { ContextTodoItems } from '../../contexts/ContextTodoItems';;


const TodoItem = ( { todo } ) => (
  <li className="TodoItem">

    <span>{ todo.text }</span>

    <ContextTodoItems.Consumer>
      { ({ complete, archive }) => (

        // Fragments : return multiple items without encapsulating
        // them inside a useless extra node like a <div>
        // See : https://reactjs.org/docs/fragments.html
        <React.Fragment>
          <button onClick={ () => { complete( todo.id ) } }>
            Finish
          </button>

          <button onClick={ () => { archive( todo.id ) } }>
            Archive
          </button>
        </React.Fragment>
      )}
    </ContextTodoItems.Consumer>

  </li>
);


export default TodoItem;