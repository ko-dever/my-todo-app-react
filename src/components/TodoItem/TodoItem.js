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

    return (
      <StyledItem
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
      >
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


              { this.state.mouseIsOver && (
                <React.Fragment>
                  <ButtonArchive
                    onClick={ () => { archive( todo.id ) } }
                    isArchived={ todo.archivedAt ? true : false }
                  />


                  <ButtonDelete
                    onClick={ () => { remove( todo.id ) } }
                  />
                </React.Fragment>
              )}

            </React.Fragment>
          )}
        </ContextTodoItems.Consumer>
      </StyledItem>
    );
  }
}


export default TodoItem;