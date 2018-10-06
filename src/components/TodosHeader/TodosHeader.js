import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledHeader = styled.header`
  padding-top: 20px;
  text-align : center;
`;


/**
 * Component's function
 *
 * @param {Object} props - Component's props
 * @param {Number} props.nbTodos - Number of todos currently displayed
 * @return {JSX.Element}
 */
const TodosHeader = ( { nbTodos }) => (
  <StyledHeader>

    <strong>My first TODO app</strong>

    { typeof nbTodos === 'undefined'
      ? ''
      : ` (#${ nbTodos })`
    }

  </StyledHeader>
);


// Component's default props
TodosHeader.defaultProps = {
  nbTodos: 0,
};


// Component props typechecking
TodosHeader.propTypes = {
  nbTodos: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};


export default TodosHeader;