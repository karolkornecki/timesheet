import React,{Component} from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

class DescriptionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {text: props.initialText};
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose() {
        ModalManager.close();
        this.props.onOkClose(this.refs.textArea.value)
    }

    render() {
        const textStyle = {width: '100%', height: '100px'}
        const { onRequestClose } = this.props;
        return (
            <Modal
                onRequestClose={onRequestClose}
                effect={Effect.SlideFromRight}>

                <div className="modal-header">
                    <h3 className="modal-title">Note</h3>
                </div>
                <div className="modal-body">
                    <textarea ref="textArea"
                              style={textStyle}
                              value={this.state.text}
                              onChange={(e) => this.setState({text: e.target.value})}/>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" type="button" onClick={this.handleClose}>OK</button>
                    <button className="btn btn-warning" type="button" onClick={ModalManager.close}>Cancel</button>
                </div>
            </Modal>
        );
    }
}

export default DescriptionModal