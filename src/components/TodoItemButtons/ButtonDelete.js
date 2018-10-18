import React from 'react';
import ButtonIcon from './ButtonIcon';

import iconTrash from './icons/trash.svg';


const ButtonDelete = ( props ) => (
  <ButtonIcon
    alt="Trash icon"

    src={ iconTrash }

    title="Delete this todo"

    onClick={ props.onClick }
  />
);


export default ButtonDelete;