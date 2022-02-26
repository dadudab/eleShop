import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Modal = (props) => {
  const modalOverlay = (
    <div className={classes.overlay} onClick={props.onClose}></div>
  );
  const modal = (
    <div className={classes.modal}>
      <div className={classes.modalWrapper}>{props.children}</div>
    </div>
  );

  const portalElement = document.getElementById('modal-root');

  return (
    <Fragment>
      {ReactDOM.createPortal(modalOverlay, portalElement)}
      {ReactDOM.createPortal(modal, portalElement)}
    </Fragment>
  );
};

export default Modal;
