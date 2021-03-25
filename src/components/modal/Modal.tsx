import React from "react"
import "./Modal.scss"

// @ts-ignore
const Modal = ({WrappedComponent, properties, onClose, title = ''}) => (
    <div className="modal-window">
        <div className="inner-window">
            <div className="modal-title">{title}</div>
            <span className="close-button" onClick={onClose}>&#10006;</span>
            <WrappedComponent {...properties}/>
        </div>
    </div>
);

export default Modal;
