import styled from 'styled-components';


const StyledItem = styled.li`
  background-color: orange;

  display: flex;
  align-items: center;

  height: 35px;
  margin : 0 5px 5px;

  white-space: nowrap;
`;


const StyledTitle = styled.span`
  flex-grow: 1;
`;


export {
  StyledItem,
  StyledTitle,
};