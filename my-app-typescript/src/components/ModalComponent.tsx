import * as React from 'react';
import * as Modal from 'react-modal';

interface PropValues {
    title: string;
    description: string;
    openInitially: boolean;
    onClose: Function;
}

interface StateValues {
    isModalOpen: boolean;
}

class ModalComponent extends React.Component<PropValues, StateValues> {

    constructor(props: PropValues) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = { isModalOpen: this.props.openInitially };
    }

    componentDidUpdate(prevProps: PropValues) {
        if (this.props.openInitially !== prevProps.openInitially) {
            this.setState({'isModalOpen' :  this.props.openInitially});
        }
    }
    render() {

        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };

        return (
            <Modal
                isOpen={this.state.isModalOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                parentSelector={() => document.body}
            >
                <h2>{this.props.title}</h2>
                <div>{this.props.description}</div>
                <button onClick={this.closeModal}>close</button>
            </Modal>
        );
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
        this.props.onClose();
    }
}

export default ModalComponent;