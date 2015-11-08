import React, {Component} from 'react';

class Modal extends Component{
    constructor(...props) {
        super(...props);
        this.wasOpen = false;
    }
    
    render() {
        let modalClass = "modal-window ";
        let closedClass = this.wasOpen? "out" : "";
        modalClass+= (this.props.isOpen)? "in": closedClass;
        this.wasOpen = this.props.isOpen;
        return (
            <div className={modalClass}>
                <a href="#" className="modal-close" onClick={this._closeHandler.bind(this)}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </a>
                <div className="modal-body">
                    {this.props.children}
                </div>
            </div>
        );
    }

    _closeHandler(e) {
        this.props.onClose();
    }
}

Modal.defaultProps = {
    onClose: ()=>{}
}

export default Modal;