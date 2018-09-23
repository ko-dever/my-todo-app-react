// @ts-check

import React from 'react';


export const ContextTodoItems = React.createContext({

  archive( todoId = 'NO_ID_PASSED' ) {
    console.log( 'ContextTodoItems.archive() default, arg :', todoId );
  },

  complete( todoId = 'NO_ID_PASSED' ) {
    console.log( 'ContextTodoItems.complete() default, arg :', todoId );
  },

});