import React from 'react';
import styled from 'styled-components';

import RepoLink from '../RepoLink';
import TodosView from '../TodosView';


const StyledApp = styled.div`
  padding: 10px 0;
`;


export default () => (
  <React.Fragment>

    <RepoLink />

    <StyledApp>

      <TodosView />

    </StyledApp>

  </React.Fragment>
);