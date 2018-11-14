import React from 'react';
import PropTypes from 'prop-types';

import { ContextTodoItems } from '../../contexts/ContextTodoItems';

import {
  StyledItem,
  StyledTitle
} from './ItemStyledComponents';

import {
  ButtonComplete,
  ButtonArchive,
  ButtonDelete,
} from '../TodoItemButtons';


class TodoItem extends React.Component {

  static defaultProps = {
    todo: {
      id  : 'todo#' + (+new Date()),
      text: 'TODO_DEFAULT_TEXT',
    },
  };


  static propTypes = {
    // This component is used in a loop, and thus it requires a `key` prop, but
    // it must not be checked here as it is only for React internal's mechanisms

    todo: PropTypes.shape({
      id         : PropTypes.string.isRequired,
      text       : PropTypes.string.isRequired,
      createdAt  : PropTypes.instanceOf( Date ),
      archivedAt : PropTypes.instanceOf( Date ),
      completedAt: PropTypes.instanceOf( Date ),
    }),
  };


  state = {
    mouseIsOver: false,
  };


  // Lets us consume the nearest current value of that Context type using this.context
  // https://reactjs.org/docs/context.html#classcontexttype
  // New way to consume Context in React v16.6
  // https://github.com/facebook/react/blob/master/CHANGELOG.md#react-dom-2
  static contextType = ContextTodoItems;


  handleMouseEnter = () => {
    this.setState( prevState => ({
      mouseIsOver: !prevState.mouseIsOver,
    }));
  };


  handleMouseLeave = () => {
    this.setState( prevState => ({
      mouseIsOver: !prevState.mouseIsOver,
    }));
  };


  render() {
    const { todo } = this.props;
    const context  = this.context;

    return (
      <StyledItem
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
      >

        {/*
          Fragments : return multiple items without wrapping them inside a useless extra node
          See : https://reactjs.org/docs/fragments.html
        */}
        <React.Fragment>

          <ButtonComplete
            onClick={ () => { context.completeTodo( todo.id ) } }
            isCompleted={ todo.completedAt ? true : false }
          />


          <StyledTitle>{ todo.text }</StyledTitle>


          { this.state.mouseIsOver && (
            <React.Fragment>
              <ButtonArchive
                onClick={ () => { context.archiveTodo( todo.id ) } }
                isArchived={ todo.archivedAt ? true : false }
              />


              <ButtonDelete
                onClick={ () => { context.removeTodo( todo.id ) } }
              />
            </React.Fragment>
          )}

        </React.Fragment>

      </StyledItem>
    );
  }
}


export default TodoItem;