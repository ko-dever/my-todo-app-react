import React from 'react';
import ButtonIcon from './ButtonIcon';

import folderClosed from './icons/folder-closed.svg';
import folderOpened from './icons/folder-opened.svg';


class ButtonArchive extends React.Component {

  state = {
    mouseIsOver: false,
  };


  handleMouseEnter = () => {
    this.setState( prevState => ({
      mouseIsOver: !prevState.mouseIsOver,
    }));
  };


  handleMouseLeave = () => {
    this.setState( prevState => ({
      mouseIsOver: !prevState.mouseIsOver,
    }));
  };


  render = () => {
    const { mouseIsOver } = this.state;
    const { isArchived } = this.props;

    return (
      <ButtonIcon
        alt={ mouseIsOver ? 'Folder opened' : 'Folder closed' }

        src={ mouseIsOver ? folderOpened : folderClosed }

        title={ isArchived ? 'Unarchive this todo' : 'Archive this todo' }

        onClick={ this.props.onClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
      />
    )
  };
}


export default ButtonArchive;