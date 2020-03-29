import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios'
import './PhotoModal.css'


export default function PhotoModal(props) {
    const [state, setState] = useState({
        selectedFile: null
    });


    let fileSelectedHandler = event => {
        setState({selectedFile: event.target.files[0]});
    };

    let fileUploadHandler = () => {
        console.log('kao uploading...');
    }

    return(


        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload a photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"photoUpload"}>
                        <input
                            ref={fileInput => fileInput = fileInput}
                            onChange={fileSelectedHandler} type={"file"}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={"uploadButton"}>
                        <Button variant="primary" onClick={fileUploadHandler}>
                            Upload
                        </Button>
                    </div>
                    <div className={"doneButton"}>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Done
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>)
}