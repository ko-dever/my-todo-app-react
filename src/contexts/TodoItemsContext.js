// @ts-check

import React from 'react';

export const ContextItemsArchive = React.createContext( (todoId = 'NO_ID_PASSED') => {
  console.log( 'MyContext default fn(), arg :', todoId );
});