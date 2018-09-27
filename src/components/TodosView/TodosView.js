import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TodosHeader from '../TodosHeader';
import TodoInput from '../TodoInput';
import TodosFilter, { TODOS_FILTERS } from '../TodosFilter';
import TodosList from '../TodosList';

import { SAMPLE_TODOS } from '../../sample-data';
import { ContextTodoItems } from '../../contexts/ContextTodoItems';


const StyledView = styled.div`
  width : 500px;
  margin: auto;
  background-color: rgb(203, 203, 203);
`;


class TodosView extends React.Component {

  constructor( props ) {
    super( props );

    // static value : we don't need to store it the state
    // `currentTodos` will be based on it
    this.allTodos = [];
    // this.allTodos = SAMPLE_TODOS;

    const initialFilter = this.getInitialFilter();

    this.state = {
      todosFilter : initialFilter,

      // we could have mutated `currentTodos` in `componentDidMount()`
      // but why not do this as soon as we can ?
      currentTodos: this.getTodosToDisplay( initialFilter ),
    };
  }


  /** Find which initial filter to use */
  getInitialFilter() {
    const { initialFilter } = this.props;
    const filterAsked       = TODOS_FILTERS[ initialFilter ];
    const defaultFilter     = TODOS_FILTERS.active;

    if ( ! filterAsked ) {
      console.info(
        'TodosView.getInitialFilter()',
        '\n ↳ This filter [ %s ] does not exist.',
        '\n ↳ Fallback to filter [ %s ].',
        filterAsked,
        defaultFilter,
      );

      return defaultFilter.key;
    }

    return filterAsked.key;
  };


  /** Add a new todo */
  handleAddTodo = ( textNewTodo ) => {
    const newTodo = {
      id  : 'todo#' + (+ new Date()), // generate a timestamp
      text: textNewTodo,
    };

    // merge the new item with the existing ones
    this.allTodos = [ ...this.allTodos, newTodo ];

    // no need to trigger a render if we add a todo while
    // we are not on the list (filter) of active items
    if ( this.state.todosFilter === TODOS_FILTERS.active.key ) {
      this.setState({
        currentTodos: this.getTodosToDisplay()
      });
    }
  };


  /** Mark a todo as archived */
  handleArchiveTodo = ( todoId ) => {
    this.manageTodos( 'archive', todoId );
  };


  /** Delete completely a todo */
  handleDeleteTodo = ( todoId ) => {
    this.manageTodos( 'delete', todoId );
  };


  /** Mark a todo as completed */
  handleFinishTodo = ( todoId ) => {
    this.manageTodos( 'finish', todoId );
  };


  /** Handle the selection of a new filter */
  handleFilterChange = ( newFilter ) => {
    // block if we are still on the same filter
    if ( newFilter === this.state.todosFilter ) {
      return;
    }

    console.log( 'handleFilterChange() Will update filter to [ %s ]', newFilter );

    const todos = this.getTodosToDisplay( newFilter );

    // this will trigger a new render with the new todos
    this.setState({
      todosFilter : newFilter,
      currentTodos: todos,
    });
  };


  /** Get items to display, according to current filter */
  getTodosToDisplay = ( currentFilter = this.state.todosFilter ) => {
    console.log( 'getTodosToDisplay() Called with filter [ %s ]', currentFilter );

    const { allTodos } = this;

    // show completed items (can be archived too)
    if ( currentFilter === TODOS_FILTERS.completed.key ) {
      return allTodos.filter( todo => {
        return todo.isCompleted === true;
      });
    }

    // show archived items (can be completed too)
    else if ( currentFilter === TODOS_FILTERS.archived.key ) {
      return allTodos.filter( todo => {
        return todo.isArchived === true;
      });
    }

    else { // default to active items (active !== completed && !== archived)
      return allTodos.filter( todo => {
        return !todo.isCompleted && !todo.isArchived;
      });
    }
  };


  /** Perform various actions on one todo */
  manageTodos = ( action, todoId ) => {
    if ( !action ) {
      console.error( 'manageTodos() An action is needed.' );
      return;
    }

    if ( !todoId ) {
      console.error( 'manageTodos() No action possible without an ID.' );
      return;
    }


    action = action.toLowerCase();


    const actionsAllowed = [ 'finish', 'archive', 'delete' ];

    // prevent unknown actions
    if ( actionsAllowed.includes( action ) === false ) {
      console.error( 'manageTodos() The action [ %s ] is not recognized', action );
      return;
    }


    if ( action !== 'delete' ) {

      const mark = action === 'finish' ? 'isCompleted' : 'isArchived';

      // find the correct item and mark it
      for (const todo of this.allTodos) {
        if ( todo.id === todoId ) {
          console.info( 'manageTodos() Will mark item [ %s ] as [ %s ]', todo.id, mark );

          if ( todo[ mark ] ) {
            delete todo[ mark ];
          } else {
            todo[ mark ] = true;
          }

          break;
        }
      }
    }

    else { // action === 'delete'
      // get todos with where their ID is different than the one passed in the function
      this.allTodos = this.allTodos.filter( todo => todo.id !== todoId );
    }

    this.setState({
      currentTodos: this.getTodosToDisplay()
    });
  };


  render() {
    console.log( '------------------------------------' );
    console.log( 'TodosView render()' );

    const { currentTodos } = this.state;

    return (
      <StyledView>

        <TodosHeader nbTodos={ currentTodos.length } />

        <TodoInput fnAddTodo={ this.handleAddTodo } />

        <TodosFilter
          activeFilter={ this.state.todosFilter }
          fnFilterChange={ this.handleFilterChange }
        />

        <ContextTodoItems.Provider value={{
          remove  : this.handleDeleteTodo,
          archive : this.handleArchiveTodo,
          complete: this.handleFinishTodo,
        }}>

          <TodosList todos={ currentTodos } />

        </ContextTodoItems.Provider>

      </StyledView>
    );
  }
}


// Component's default props
TodosView.defaultProps = {
  initialFilter: TODOS_FILTERS.active.key,
};


// Component props typechecking
TodosView.propTypes = {
  initialFilter: PropTypes.string,
};


export default TodosView;