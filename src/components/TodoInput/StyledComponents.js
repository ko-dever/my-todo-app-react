import styled from 'styled-components';


const StyledWrapper = styled.div`
  margin: 20px 0 0;
`;


const inputPadding = '10px';

const StyledInput = styled.input`
  width  : calc( 100% - (${inputPadding} * 2) );
  height : 40px;
  padding: 0 ${inputPadding};
  border : 0;
`;


export { StyledWrapper, StyledInput };