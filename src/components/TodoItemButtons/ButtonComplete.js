import React from 'react';
import ButtonIcon from './ButtonIcon';

import emptyCircle from './icons/circle-empty.svg';
import checkedCircle from './icons/circle-checked.svg';


class ButtonComplete extends React.Component {

  state = {
    imgSrc: this.props.isCompleted ? checkedCircle : emptyCircle,
  };


  handleMouseEnter = () => {
    this.setState({
      imgSrc: this.props.isCompleted ? emptyCircle : checkedCircle,
    });
  };


  handleMouseLeave = () => {
    this.setState({
      imgSrc: this.props.isCompleted ? checkedCircle : emptyCircle,
    });
  };


  render = () => (
    <ButtonIcon
      alt={ this.props.isCompleted ? 'Circle with check mark' : 'Empty circle' }

      src={ this.state.imgSrc }

      title={ this.props.isCompleted ? 'Unfinish this todo' : 'Finish this todo' }

      onClick={ this.props.onClick }
      onMouseEnter={ this.handleMouseEnter }
      onMouseLeave={ this.handleMouseLeave }
    />
  );
}


export default ButtonComplete;