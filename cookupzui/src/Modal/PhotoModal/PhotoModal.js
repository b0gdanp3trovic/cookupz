import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios'
import './PhotoModal.css'
import checkTokenService from "../../checkToken";
import Spinner from "react-bootstrap/Spinner";
import {Alert} from "react-bootstrap";


export default function PhotoModal(props) {
    const [state, setState] = useState({});
    const [uploadInitialized, setUploadInitialized] = useState(false);
    const [uploadFinished, setUploadFinished] = useState(false);


    let fileSelectedHandler = event => {
        console.log(event.target.files[0])
        const file = event.target.files[0];
        setState({selectedFile: file});
        console.log(file)
    };

    let fileUploadHandler = () => {
        setState({loading: true});
        setUploadInitialized(true)

        let formData = new FormData();
        formData.append("image", state.selectedFile);
        formData.append("user", localStorage.getItem("user"));
        const accessToken = localStorage.getItem("access");
       checkTokenService.validateToken(accessToken).then(res => {
            axios.post("http://localhost:8000/dashboard/photo/" + localStorage.getItem("currentUsername"),
                formData, {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("access")
                }
                }).then(res => {
                setState({loading:false});
                setUploadFinished(true)
            })
        })
    };

    return(


        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload a photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"photoUpload"}>
                        {!uploadInitialized &&< input
                            onChange={fileSelectedHandler} type={"file"}/>}
                        {uploadInitialized &&
                        <div className={"result"}>
                            {state.loading && <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>}
                            {!state.loading &&   <Alert variant={"success"}>
                                Upload complete.
                            </Alert>}
                        </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={"uploadButton"}>
                        {!uploadFinished && <Button variant="primary" onClick={fileUploadHandler}>
                            Upload
                        </Button>}
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