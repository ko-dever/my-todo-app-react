import React from 'react';
import styled from 'styled-components';

import TodosView from '../TodosView';


const StyledApp = styled.div`
  padding: 10px 0;
`;


export default () => (

  <StyledApp>

    <TodosView />

  </StyledApp>

);