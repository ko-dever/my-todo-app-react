import React from 'react';

import {
  StyledLink,
  StyledIcon,
  StyledText,
} from './RepoLinkStyledComponents';

import iconBranch from './code-branch.svg';


const RepoLink = () => (
  <StyledLink
    href="https://bitbucket.org/DrNova/react-my-todo-app"
    target="_blank"

    // target="_blank" without rel="noopener noreferrer"
    // considered as a security risk. See this demo page :
    // https://mathiasbynens.github.io/rel-noopener/
    rel="noopener noreferrer"
  >

    <StyledIcon
      src={ iconBranch }
      alt="Branch icon"
    />

    <StyledText>
      Source code
    </StyledText>

  </StyledLink>
);

export default RepoLink;