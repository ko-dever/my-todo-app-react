import styled from 'styled-components';


const StyledFilter = styled.div`
  margin-top: 5px;
  background-color: orange;
  text-align: center;
`;


const StyledButton = styled.span`
  display: inline-block;
  margin: 0 20px;

  &.filter-active {
    font-weight: bold;
    text-decoration: underline;
  }

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;


export { StyledFilter, StyledButton };