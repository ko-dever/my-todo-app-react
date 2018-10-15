import React from 'react';
import PropTypes from 'prop-types';

import { StyledView } from './ViewStyledComponents';
import TodosHeader from '../TodosHeader';
import TodoInput from '../TodoInput';
import TodosFilter, { TODOS_FILTERS } from '../TodosFilter';
import TodosList from '../TodosList';

import { SAMPLE_TODOS } from '../../sample-data';
import { ContextTodoItems } from '../../contexts/ContextTodoItems';


// Private store all of saved todos
// Don't need to be in component's state : `currentTodos` will be based on it
let ALL_TODOS = SAMPLE_TODOS;


class TodosView extends React.Component {

  constructor( props ) {
    super( props );

    const initialFilter = this.getInitialFilter();

    this.state = {
      todosFilter : initialFilter,

      // we could have mutated `currentTodos` in `componentDidMount()`
      // but why not do this as soon as we can ?
      currentTodos: this.getTodosToDisplay( initialFilter ),
    };
  }


  /**
   * Find which initial filter to use
   *
   * @return {String} Name of the filter to apply
   */
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


  /**
   * Create and add a new todo to the global list
   *
   * @param {String} textNewTodo - Todo's text
   */
  handleAddTodo = ( textNewTodo ) => {
    const currentDate = new Date();
    const newTodo = {
      id       : 'todo#' + (+currentDate), // generate a timestamp
      text     : textNewTodo,
      createdAt: currentDate,
    };

    // merge the new item with the existing ones
    ALL_TODOS = [ ...ALL_TODOS, newTodo ];
    console.info( 'New todo added', newTodo );

    // no need to trigger a render if we add a todo while
    // we are not on the list (filter) of active items
    if ( this.state.todosFilter === TODOS_FILTERS.active.key ) {
      this.setState({
        currentTodos: this.getTodosToDisplay()
      });
    }
  };


  /**
   * Archive a todo
   *
   * @param {String} todoId - Todo's ID to process
   */
  handleArchiveTodo = ( todoId ) => {
    this.manageTodoState( 'archive', todoId );
  };


  /**
   * Delete completely a todo
   *
   * @param {String} todoId - Todo's ID to process
   */
  handleDeleteTodo = ( todoId ) => {
    this.manageTodoState( 'delete', todoId );
  };


  /**
   * Finish a todo (= completed)
   *
   * @param {String} todoId - Todo's ID to process
   */
  handleFinishTodo = ( todoId ) => {
    this.manageTodoState( 'finish', todoId );
  };


  /**
   * Update the active filter
   *
   * @param {String} newFilter - New filter to apply for the list of todos
   */
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


  /**
   * Find todos to display according to active filter
   *
   * @param {String} [currentFilter=this.state.todosFilter] - Active filter
   * @return {Array} List of todos
   */
  getTodosToDisplay = ( currentFilter = this.state.todosFilter ) => {
    console.log( 'getTodosToDisplay() Called with filter [ %s ]', currentFilter );


    /**
     * Sort todos on the specified field
     * Default to DESCENDING order (items with the most recent date on top)
     *
     * @param {Array<{}>} todos - Input Array to sort
     * @param {String} [field="createdAt"] - Sorting will be done on this field
     * @return {Array<{}>} Output array sorted
     */
    const sortTodos = function sortTodos( todos, field = 'createdAt' ) {
      // Duplicate our array of todos
      const arr = Array.from( todos );

      return arr.sort( (itemA, itemB) => {
        const dateA = itemA[ field ];
        const dateB = itemB[ field ];

        if ( dateA > dateB ) return -1;
        if ( dateA < dateB ) return 1;
        return 0;
      });
    };


    let filteredTodos = [];
    let sortField;

    const fieldCompleted = 'completedAt';
    const fieldArchived  = 'archivedAt';


    // show completed items (can be archived too)
    if ( currentFilter === TODOS_FILTERS.completed.key ) {

      filteredTodos = ALL_TODOS.filter( todo => {
        return todo.hasOwnProperty( fieldCompleted );
      });

      sortField = fieldCompleted;
    }

    // show archived items (can be completed too)
    else if ( currentFilter === TODOS_FILTERS.archived.key ) {

      filteredTodos = ALL_TODOS.filter( todo => {
        return todo.hasOwnProperty( fieldArchived );
      });

      sortField = 'archivedAt';
    }

    // default to active items (active !== completed and archived)
    else {
      filteredTodos = ALL_TODOS.filter( todo => {
        return (
          todo.hasOwnProperty( fieldCompleted ) === false
          && todo.hasOwnProperty( fieldArchived ) === false
        );
      });
    }


    return sortTodos( filteredTodos, sortField );
  };


  /**
   * Manage the state of a specified todo
   *
   * @param {String} action - Which action to perform on the todo
   * @param {String} todoId - Todo's ID to process
   */
  manageTodoState = ( action, todoId ) => {
    if ( !action ) {
      console.error( 'manageTodoState() An action is needed.' );
      return;
    }

    if ( !todoId ) {
      console.error( 'manageTodoState() No action possible without an ID.' );
      return;
    }


    action = action.toLowerCase();


    const actionsAllowed = [ 'finish', 'archive', 'delete' ];

    // prevent unknown actions
    if ( actionsAllowed.includes( action ) === false ) {
      console.error( 'manageTodoState() The action [ %s ] is not recognized', action );
      return;
    }


    // delete todo : get all todos with ID !== than the one passed in the function
    if ( action === 'delete' ) {
      ALL_TODOS = ALL_TODOS.filter( todo => todo.id !== todoId );
    }

    // finish OR archive
    else {

      // find the first item (and stop there) that satisfies the condition
      // and create a copy of the item at this position
      const indexTodo = ALL_TODOS.findIndex( todo => todo.id === todoId );
      let updatedTodo = { ...ALL_TODOS[ indexTodo ] };

      const stateMark = action === 'archive' ? 'archivedAt' : 'completedAt';


      console.info(
        'manageTodoState() Will mark item [ %s ] as [ %s ]',
        updatedTodo.id, stateMark
      );


      // Switch item's state
      if ( updatedTodo.hasOwnProperty( stateMark ) === false ) {

        // enable state
        updatedTodo[ stateMark ] = new Date();

      } else {
        // disable state

        // using `delete` operator
        // delete updatedTodo[ stateMark ];
        // delete updatedTodo[ timeMark ];


        // using `Reflect.deleteProperty()`
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty
        // Reflect.deleteProperty( updatedTodo, stateMark );
        // Reflect.deleteProperty( updatedTodo, timeMark );


        // using the magic of ES6
        // destructuring, computed prop and spreap operator !

        // 1) Using static aliases
        // const {

        //   // compute and extract properties into temp variables
        //   [ stateMark ]: tempStateMark,
        //   [ timeMark  ]: tempTimeMark,

        //   // get remaining properties
        //   ...rest

        // } = updatedTodo; // destruct this object

        // // then update our original
        // updatedTodo = rest;



        // 2) Using "dynamic aliases"
        //    This one seems complex for the small change to make,
        //    but it is just a demonstration of what is possible.
        const obj = {};
        ( // evaluate inner expression : we don't need to create new (temp) variables
          {
            // compute and extract properties
            //
            // `[ prop ]:`
            // ↳ Compute prop name with dynamic values (our variables)
            //
            // `obj[ prop ]`
            // ↳ instead of manually creating static aliases to computed prop,
            //    we can create dynamic keys (prop) in our temp object reusing the same name.
            //    Thus we don't need to care about naming them.
            [ stateMark ]: obj[ stateMark ],

            // get remaining properties as an object (without the extracted ones above)
            // and overwrite our original item with it
            ...updatedTodo

          } = updatedTodo // destruct this object
        );
      }

      // remove and replace the todo at the specified index
      ALL_TODOS.splice( indexTodo, 1, updatedTodo );
    }


    this.setState({
      currentTodos: this.getTodosToDisplay()
    });
  };


  /**
   * Component's render function
   *
   * @return {JSX.Element}
   */
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