import React from 'react';
import styled from 'styled-components';


const StyledHeader = styled.header`
  padding-top: 20px;
  text-align : center;
`;


export default ( { nbTodos }) => (
  <StyledHeader>

    <strong>My first TODO app</strong> (#{ nbTodos })

  </StyledHeader>
);