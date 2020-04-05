import Jumbotron from "react-bootstrap/Jumbotron";
import {Form, Toast} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import withRouter from "react-router-dom/es/withRouter";
import checkTokenService from "../../checkToken";
import axios from "axios";
import Modal from "react-bootstrap/Modal"

function OfferModal(props){
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [tag, setTag] = useState('');
    const [title, setTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('')
    const [isInvalid, setIsInvalid] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        postOffer().then(res => {
            props.handleClose();
        })
    }

    function validateInput(params){
        return params.description.length > 0
    }

    function postOffer(){
        const accessToken = localStorage.getItem("access");
        return checkTokenService.validateToken(accessToken).then(res => {

            const params = {
                description: description,
                location: location,
                tag: tag,
                title: title,
                username: localStorage.getItem("currentUsername")
            };
            if(!validateInput(params)){
                setIsInvalid(true);
                setToastMessage('Description cannot be left empty.')
                return;
            }
            axios.post("http://localhost:8000/dashboard/offerdash/" + localStorage.getItem("currentUsername"), params, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            }).then(res => {
                props.history.push('/dashboard');
            })
        })
    }

    return(
        <>
            <Button variant="primary" onClick={props.handleShow}>
                Launch demo modal
            </Button>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"offerModalWrapper"}>
                        <div >
                            <Jumbotron className={"offerJumbotron"}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control
                                            placeholder = {"Title"}
                                            value = {title}
                                            onChange = {e => setTitle(e.target.value)}
                                            as="textarea"
                                            rows="1" />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control
                                            placeholder = {"Describe your offer"}
                                            value = {description}
                                            onChange = {e => setDescription(e.target.value)}
                                            as="textarea"
                                            rows="3" />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as = {Col}>
                                            <Form.Control
                                                placeholder = {"Location (optional):"}
                                                value = {location}
                                                onChange = {e => setLocation(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group as = {Col}>
                                            <Form.Control
                                                placeholder = {"Tag (optional):"}
                                                value = {tag}
                                                onChange = {e => setTag(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button className={"btn-danger"} block  type="submit" >
                                        Submit
                                    </Button>
                                </Form>
                            </Jumbotron>
                        </div>
                        {isInvalid &&
                        <Toast  className={"toastInvOffer"}>
                            <Toast.Body>{toastMessage}</Toast.Body>
                        </Toast>}
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default withRouter(OfferModal)