// @ts-check

import React from 'react';

import './TodosView.css';
import TodosHeader from './TodosHeader';
import TodoInput from './TodoInput';
import TodosFilter, { TODOS_FILTERS } from './TodosFilter';
import TodosList from './TodosList';

// import { FAKE_ITEMS } from '../sample-data';
import { ContextItemsArchive } from '../contexts/TodoItemsContext';


class TodosView extends React.Component {

  constructor( props ) {
    super( props );

    this.state = {
      todosFilter: this.getInitialView(),

      allTodos: [],
      // allTodos: FAKE_ITEMS,

      // items currently displayed (synced with the active filter)
      currentTodos: [],
    };

    /* // NOTE: avoid calling `setState()` inside the constructor
     *
     * We could have call `getTodosToDisplay()` <-- without argument
     * inside `componentDidMount()` but this would have trigger a new render
     * because state is mutated. (whereas the component is already mounted and rendered)
     *
     * As the `constructor` is triggered before anything else (and `componentDidMount()`)
     * we use this opportunity to set the correct value for the items to display.
     *
     * But before calling `getTodosToDisplay()`, we need to set some initial values for the state.
     * That's why we call it later, and not directly when we initialize `state`.
     *
     * See : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
     */
    this.state.currentTodos = this.getTodosToDisplay( true );
  }


  /** Guess what initial view to render */
  getInitialView() {
    const { initialView } = this.props;

    return ! TODOS_FILTERS[ initialView ]
      ? TODOS_FILTERS.active.key
      : initialView;
  };


  /** Add a new todo */
  handleAddTodo = ( newTodoText ) => {

    // get all existing todos
    const existingTodos = this.state.allTodos;


    // build an "Todo object"
    const newTodo = {
      id  : 'todo#' + (+ new Date()), // generate a timestamp
      text: newTodoText,
    };


    // update private state by merging existing todos with the new one
    // and refresh view to display correct todos
    this.setState({
      allTodos: [
        ...existingTodos,
        newTodo,
      ],

    }, this.getTodosToDisplay );
  };


  /** Mark a todo as archived */
  handleArchiveTodo = ( todoId ) => {
    this.manageTodos( 'archive', todoId );
  };


  /** Mark a todo as completed */
  handleFinishTodo = ( todoId ) => {
    this.manageTodos( 'finish', todoId );
  };


  /** Handle the selection of a new filter */
  handleFilterChange = ( newFilter ) => {
    if ( this.state.todosFilter === newFilter ) {
      return;
    }

    console.log( 'handleFilterChange() Will update filter to [ %s ]', newFilter );

    // update private state
    // and refresh view to display correct todos
    this.setState(
      { todosFilter: newFilter },
      this.getTodosToDisplay
    );
  };


  getTodosToDisplay = ( returnTodos ) => {
    const { todosFilter, allTodos } = this.state;
    let todoToDisplay = [];

    console.log( 'getTodosToDisplay() Called with filter [ %s ]', todosFilter );


    // only show completed items, but not archived
    if ( todosFilter === TODOS_FILTERS.completed.key ) {
      todoToDisplay = allTodos.filter( todo => {
        return todo.completed === true && !todo.archived;
      });
    }

    // show archived items, no matter their status
    else if ( todosFilter === TODOS_FILTERS.archived.key ) {
      todoToDisplay = allTodos.filter( todo => {
        return todo.archived === true;
      });
    }

    else { // default to active items
      todoToDisplay = allTodos.filter( todo => {
        return !todo.completed && !todo.archived;
      });
    }

    if ( returnTodos === true ) {
      return todoToDisplay;
    }

    this.setState({ currentTodos: todoToDisplay });
  };


  /** Perform actions on Todos */
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


    let mark = '';

    if ( action === 'finish' ) {
      mark = 'completed';
    } else if ( action === 'archive' ) {
      mark = 'archived';
    } else {
      console.error( 'manageTodos() The action [ %s ] is not recognized', action );
      return;
    }


    // find the correct item and mark it
    const newTodos = this.state.allTodos.map( todo => {

      if ( todo.id === todoId ) {
        todo[ mark ] = true;
      }

      return todo;
    });


    // update private state with the new todos
    // and refresh view to display correct todos
    this.setState(
      { allTodos: newTodos },
      this.getTodosToDisplay
    );
  };


  render = () => (
    <div className="TodosView">

      <TodosHeader nbTodos={ this.state.currentTodos.length } />

      <TodoInput fnAddTodo={ this.handleAddTodo } />

      <TodosFilter
        activeFilter={ this.state.todosFilter }
        fnFilterChange={ this.handleFilterChange }
      />

      <ContextItemsArchive.Provider value={ this.handleArchiveTodo }>
        <TodosList todos={ this.state.currentTodos } />
      </ContextItemsArchive.Provider>

    </div>
  );
}

export default TodosView;