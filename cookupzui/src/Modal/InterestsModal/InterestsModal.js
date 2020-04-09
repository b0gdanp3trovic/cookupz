import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Form, Toast} from "react-bootstrap";
import Col from "react-bootstrap/Col";

export default function ExperienceModal(props){
    const[title, setTitle] = useState('');
    const[desc, setDesc] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    function validateInput(params){
        return title.length > 0 && desc.length > 0;
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!validateInput()){
            setIsInvalid(true);
            setToastMessage('No fields can be left empty.');
            return;
        }
        const experience = {
            title:title,
            int_description: desc
        };
        props.setExperience(experience);
        setTitle('');
        setDesc('');
        props.handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={props.handleShow}>
                Launch demo modal
            </Button>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"offerModalWrapper"}>
                        <div >
                            <Jumbotron className={"offerJumbotron"}>
                                <Form onSubmit={(e) => handleSubmit(e)}>
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
                                            placeholder = {"Describe your interest"}
                                            value = {desc}
                                            onChange = {e => setDesc(e.target.value)}
                                            as="textarea"
                                            rows="2" />
                                    </Form.Group>
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