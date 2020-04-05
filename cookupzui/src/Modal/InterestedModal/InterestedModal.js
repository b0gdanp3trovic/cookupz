import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import WebSocketInstance from "../../websocket";
import {Web} from "@material-ui/icons";
import checkTokenService from "../../checkToken";
import axios from "axios";


export default function InterestedModal(props){
    const[message, setMessage] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        const username = localStorage.getItem("currentUsername");
        WebSocketInstance.connect();
        Promise.all([waitForSocketConnection(), createNewChat()]).then(([resWs, resCC]) => {
            WebSocketInstance.newChatMessage({
                chat_id: resCC.data.id,
                message: message,
                author: username,
                receiver: props.chosenUser.username
            });
            props.handleClose()
        })

    }

    const waitForSocketConnection = () => {
        return new Promise((resolve) => {
            setTimeout(
                ()  =>  {
                    if(WebSocketInstance.state() === 1){
                        resolve('yay');
                    } else {
                        waitForSocketConnection();
                    }
                }, 350
            )
        })
   };

   function createNewChat(){
       const accessToken = localStorage.getItem("access");
        return new Promise(resolve => {
            checkTokenService.validateToken(accessToken).then(res => {
                axios.post('http://localhost:8000/chat/create/',{
                    offer_id: props.chosenUser.offer.id,
                    messages: {},
                    participants: {},
                    username: localStorage.getItem("currentUsername"),
                    receiver: props.chosenUser.username
                }, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("access")
                    }
                }, ).then(res => {
                    console.log('axios done')
                    resolve(res);
                })
            })
        })
   }


    return(
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Body>
                    <Form onSubmit={e => handleSubmit(e)}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                placeholder = {"Write a word or two..."}
                                value = {message}
                                onChange = {e => setMessage(e.target.value)}
                                as="textarea"
                                rows="3" />
                        </Form.Group>
                        <Button className={"btn-danger"} block  type="submit" >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}