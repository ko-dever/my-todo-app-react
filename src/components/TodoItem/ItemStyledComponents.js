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
  margin-top : 3px;
  padding-left : 5px;
  padding-right: 5px;
`;


export {
  StyledItem,
  StyledTitle,
};