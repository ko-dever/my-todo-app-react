import React from 'react';
import PropTypes from 'prop-types';

import { ContextTodoItems } from '../../contexts/ContextTodoItems';
import {
  StyledItem,
  StyledTitle
} from './ItemStyledComponents';

import { ButtonComplete } from '../TodoItemButtons';


/**
 * Component's function
 *
 * @param {Object} props - Component's props
 * @param {Object} props.todo - A Todo object
 * @return {JSX.Element}
 */
const TodoItem = ( { todo } ) => (
  <StyledItem>
    <ContextTodoItems.Consumer>
      { ({ complete, archive, remove }) => (
        // `delete` is already a reserved keyword

        // Fragments : return multiple items without encapsulating
        // them inside a useless extra node like a <div>
        // See : https://reactjs.org/docs/fragments.html
        <React.Fragment>

          <ButtonComplete
            onClick={ () => { complete( todo.id ) } }
            isCompleted={ todo.completedAt ? true : false }
          />

          <StyledTitle>{ todo.text }</StyledTitle>

          <button onClick={ () => { archive( todo.id ) } }>
            { todo.archivedAt ? 'Unarchive' : 'Archive' }
          </button>

          {/* "Delete" button only displayed for archived items */}
          {/* TODO: a todo should be removable at any time */}
          { ! todo.archivedAt ? ''
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
    id  : 'todo#' + (+new Date()),
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
    archivedAt : PropTypes.instanceOf( Date ),
    completedAt: PropTypes.instanceOf( Date ),
  }),
};


export default TodoItem;