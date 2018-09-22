// @ts-check

import React from 'react';

import TodosHeader from '../TodosHeader';
import TodoInput from '../TodoInput';
import TodosFilter, { TODOS_FILTERS } from '../TodosFilter';
import TodosList from '../TodosList';

// import { FAKE_ITEMS } from '../../sample-data';
import { ContextItemsArchive } from '../../contexts/TodoItemsContext';


class TodosView extends React.Component {

  constructor( props ) {
    super( props );

    this.state = {
      todosFilter: this.getInitialView(),

      allTodos: [],
      // allTodos: FAKE_ITEMS,
    };

    /* // NOTE: do not call `setState()` inside the constructor
     *
     * We could have call `getTodosToDisplay()` inside `componentDidMount()`
     * but as the `constructor` is triggered before anything else we use this
     * opportunity to set the correct value.
     *
     * See : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
     */
    this.currentTodos = this.getTodosToDisplay();
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

    const newTodo = {
      id  : 'todo#' + (+ new Date()), // generate a timestamp
      text: newTodoText,
    };

    // clear items currently displayed
    this.currentTodos = null;

    // Recommended : using the updater function
    //   https://reactjs.org/docs/faq-state.html#how-do-i-update-state-with-values-that-depend-on-the-current-state
    //   https://reactjs.org/docs/faq-state.html#what-is-the-difference-between-passing-an-object-or-a-function-in-setstate
    // this will trigger a new render, and so it will get the new todos to display
    this.setState( currentState => ({
      // merge the new item with the existing ones
      allTodos: [ ...currentState.allTodos, newTodo ]
    }));
  };


  /** Mark a todo as archived */
  handleArchiveTodo = ( todoId ) => {
    this.manageTodos( 'archive', todoId );
  };


  /** Mark a todo as completed */
  // handleFinishTodo = ( todoId ) => {
  //   this.manageTodos( 'finish', todoId );
  // };


  /** Handle the selection of a new filter */
  handleFilterChange = ( newFilter ) => {
    if ( this.state.todosFilter === newFilter ) {
      return;
    }

    console.log( 'handleFilterChange() Will update filter to [ %s ]', newFilter );

    // clear items currently displayed
    this.currentTodos = null;

    // update private state
    // this will trigger a new render, and so it will get the new todos to display
    this.setState({ todosFilter: newFilter });

    // here the new filter will trigger new todos to be displayed
    // also we want the input to keep the focus
  };


  getTodosToDisplay = () => {

    if ( this.currentTodos ) {
      console.log( 'getTodosToDisplay(), Return items already stored' );
      return this.currentTodos;
    }

    const { todosFilter, allTodos } = this.state;
    let todoToDisplay = [];

    console.log( 'getTodosToDisplay() Called with filter [ %s ]', todosFilter );


    // only show completed items, but not archived
    if ( todosFilter === TODOS_FILTERS.completed.key ) {
      todoToDisplay = allTodos.filter( todo => {
        return todo.isCompleted === true && !todo.isArchived;
      });
    }

    // show archived items, no matter their status
    else if ( todosFilter === TODOS_FILTERS.archived.key ) {
      todoToDisplay = allTodos.filter( todo => {
        return todo.isArchived === true;
      });
    }

    else { // default to active items
      todoToDisplay = allTodos.filter( todo => {
        return !todo.isCompleted && !todo.isArchived;
      });
    }

    // update and return new items to display
    return this.currentTodos = todoToDisplay;
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
      mark = 'isCompleted';
    } else if ( action === 'archive' ) {
      mark = 'isArchived';
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


    // clear items currently displayed
    this.currentTodos = null;

    // update private state with the new todos
    this.setState({ allTodos: newTodos });
  };


  render() {
    console.log( '------------------------------------' );
    console.log( 'TodosView render()' );
    return (
      <div className="TodosView">

        <TodosHeader nbTodos={ this.getTodosToDisplay().length } />

        <TodoInput fnAddTodo={ this.handleAddTodo } />

        <TodosFilter
          activeFilter={ this.state.todosFilter }
          fnFilterChange={ this.handleFilterChange }
        />

        <ContextItemsArchive.Provider value={ this.handleArchiveTodo }>
          <TodosList todos={ this.getTodosToDisplay() } />
        </ContextItemsArchive.Provider>

      </div>
    );
  }
}

export default TodosView;