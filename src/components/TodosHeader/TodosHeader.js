import React from 'react';


const TodosHeader = ({ nbTodos }) => (
  <header className="TodosHeader">

    <strong>My first TODO app</strong> (#{ nbTodos })

  </header>
);


export default TodosHeader;