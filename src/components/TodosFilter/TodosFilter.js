import React from 'react';


const TODOS_FILTERS = Object.freeze({
  active   : { key: 'active',    title: 'Active',    },
  completed: { key: 'completed', title: 'Completed', },
  archived : { key: 'archived',  title: 'Archived',  },
});


const TodosFilter = ( props ) => (
  <div className="TodosFilter">

    { generateButtons( props.activeFilter, props.fnFilterChange ) }

  </div>
);


const generateButtons = function generateButtons( activeFilter, fnFilterChange ) {

  // get only the filter objects, we don't need the keys
  // @ts-ignore
  const filters = Object.values( TODOS_FILTERS );

  return filters.map( filter => {

    const activeClass = filter.key === activeFilter ? 'filter-active' : '';

    return (
      <span
        key={ filter.key }
        className={ `TodosFilter-button ${activeClass}` }
        onClick={ () => { fnFilterChange( filter.key ) } }
      >
        { filter.title }
      </span>
    );
  });
};


export default TodosFilter;
export { TODOS_FILTERS };