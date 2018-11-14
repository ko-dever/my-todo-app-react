import React from 'react';


export const ContextTodoItems = React.createContext({

  removeTodo( todoId = 'NO_ID_PASSED' ) {
    console.log( 'ContextTodoItems.delete() default, arg :', todoId );
  },

  archiveTodo( todoId = 'NO_ID_PASSED' ) {
    console.log( 'ContextTodoItems.archive() default, arg :', todoId );
  },

  completeTodo( todoId = 'NO_ID_PASSED' ) {
    console.log( 'ContextTodoItems.complete() default, arg :', todoId );
  },

});