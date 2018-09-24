import React from 'react';
import styled from 'styled-components';

import { ContextTodoItems } from '../../contexts/ContextTodoItems';


const StyledItem = styled.li`
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;


export default ( { todo } ) => (
  <StyledItem>

    <span>{ todo.text }</span>

    <ContextTodoItems.Consumer>
      { ({ complete, archive, remove }) => (
        // `delete` is already a reserved keyword

        // Fragments : return multiple items without encapsulating
        // them inside a useless extra node like a <div>
        // See : https://reactjs.org/docs/fragments.html
        <React.Fragment>
          <button onClick={ () => { complete( todo.id ) } }>
            { todo.isCompleted ? 'Not finish' : 'Finish' }
          </button>

          <button onClick={ () => { archive( todo.id ) } }>
            { todo.isArchived ? 'Unarchive' : 'Archive' }
          </button>

          {/* 'Delete' button only displayed for archived items */}
          {/* TODO : an item should be removable at any time */}
          { ! todo.isArchived ? ''
            : <button onClick={ () => { remove( todo.id ) } }>
                Delete
              </button>
          }
        </React.Fragment>
      )}
    </ContextTodoItems.Consumer>

  </StyledItem>
);