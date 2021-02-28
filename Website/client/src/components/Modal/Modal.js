import React from 'react';

const Modal = ({show, children}) => {
    return show ? <div>{children}</div> : null;
}


export default Modal;

  
