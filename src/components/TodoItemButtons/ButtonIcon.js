import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledImg = styled.img`
  width: 24px;
  cursor: pointer;
`;


const ButtonIcon = ( props ) => (
  <StyledImg { ...props } />
);


ButtonIcon.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};


export default ButtonIcon;