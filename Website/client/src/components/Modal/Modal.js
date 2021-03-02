import React from 'react';
import "./modal.scss";

const Modal = ({show, onClose, children}) => {
    return show ? <div class="modal" id="modal">
    <h2>Modal Window</h2>
    <div class="content">{children}</div>
    <div class="actions">
      <button class="toggle-button" onClick={onClose}>
        close
      </button>
    </div>
  </div> : null;
}


export default Modal;

  
