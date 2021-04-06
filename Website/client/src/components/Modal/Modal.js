import React from 'react';
import "./modal.scss";

const Modal = ({show, onClose, children, width = 'auto', height = 'auto'}) => {
  // show modal or return null
  //e.stopPropagation() ensures that closing by clicking is not propagated from the background to the modal
    return show ? 
    <div class="background" onClick={onClose}>
      <div class="modal" id="modal" onClick={(e) => e.stopPropagation()} style= {{width: width, height: height}}>
        <h2>Modal Window</h2>
        <div class="content" >{children}</div>
        <div class="actions">
          <button class="toggle-button" onClick={onClose}>
          Close
          </button>
        </div>
      </div>
    </div> : null;
}


export default Modal;

  
