import React from 'react';

import { StyledFilter, StyledButton } from './StyledComponents';


const TODOS_FILTERS = Object.freeze({
  active   : { key: 'active',    title: 'Active',    },
  completed: { key: 'completed', title: 'Completed', },
  archived : { key: 'archived',  title: 'Archived',  },
});


const TodosFilter = ( props ) => (
  <StyledFilter>

    { generateButtons( props.activeFilter, props.fnFilterChange ) }

  </StyledFilter>
);


const generateButtons = function generateButtons( activeFilter, fnFilterChange ) {

  // get only the filter objects, we don't need the keys
  // @ts-ignore
  const filters = Object.values( TODOS_FILTERS );

  return filters.map( filter => {

    const activeClass = filter.key === activeFilter ? 'filter-active' : '';

    return (
      <StyledButton
        key={ filter.key }
        className={ activeClass }
        onClick={ () => { fnFilterChange( filter.key ) } }
      >
        { filter.title }
      </StyledButton>
    );
  });
};


export default TodosFilter;
export { TODOS_FILTERS };