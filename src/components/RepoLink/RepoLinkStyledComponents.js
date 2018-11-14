import styled from 'styled-components';


const cornerSize = '87px';

const StyledLink = styled.a`
  position: absolute;
  top : 0; left: 0;

  width : ${cornerSize};
  height: ${cornerSize};

  background-color: rgb( 220, 220, 220 );
  color: inherit;
  overflow: hidden;
  text-decoration: none;

  /* Show only a specific part of the element (as it renders as a square) */
  -webkit-clip-path: polygon(
      ${cornerSize} 0,
      0 ${cornerSize}, 0 0
  );
  clip-path: polygon(
      ${cornerSize} 0,
      0 ${cornerSize}, 0 0
  );
`;


const StyledIcon = styled.img`
  position: absolute;
  top   : 3px;
  left  : 7px;
  height: 35px;
`;


const StyledText = styled.span`
  display: inline-block;

  transform: rotate( -45deg );
  transform-origin: 0;

  margin-top : 58px;
  margin-left: 7px;

  font-size     : .85rem;
  letter-spacing: 1px;
  text-align    : center;
  white-space   : nowrap;
`;


export { StyledLink, StyledIcon, StyledText, };