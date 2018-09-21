// @ts-check

import React from 'react';

import './TodosHeader.css';


const TodosHeader = ({ nbTodos }) => (
  <header className="TodosHeader">

    <strong>My first TODO app</strong> (#{ nbTodos })

  </header>
);


export default TodosHeader;