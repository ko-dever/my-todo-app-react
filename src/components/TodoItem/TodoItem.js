import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ContextTodoItems } from '../../contexts/ContextTodoItems';


const StyledItem = styled.li`
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;


const TodoItem = ( { todo } ) => (
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


// Component's default props
TodoItem.defaultProps = {
  todo: {
    id  : 'todo#_' + (+new Date()),
    text: 'TODO_DEFAULT_TEXT',
  },
};


// Component props typechecking
TodoItem.propTypes = {
  // This component is used in a loop, and thus it requires a `key` prop.
  // But this `key`, proper to React internal's mechanisms, must not be checked here

  todo: PropTypes.shape({
    id         : PropTypes.string.isRequired,
    text       : PropTypes.string.isRequired,
    isArchived : PropTypes.bool,
    isCompleted: PropTypes.bool,
  }),
};


export default TodoItem;