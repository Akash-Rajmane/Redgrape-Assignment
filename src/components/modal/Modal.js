import React from 'react';
import classes from '../../sass/Modal.module.sass'; 

const Modal = ({ name, onDelete, onCancel, delId }) => {
  return (
    <div className={classes.modal_container}>
      <div className={classes.modal}>
        <p className={classes.modal_message}>Are you sure you want to delete the record of {name}?</p>
        <div className={classes.modal_buttons}>
          <button className={classes.delete_button} onClick={()=>onDelete(delId)}>Delete</button>
          <button className={classes.cancel_button} onClick={onCancel}>No, Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
