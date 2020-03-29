import React, {useState} from 'react'
import Sidebar from "../SideBar/Sidebar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import './Offer.css'
import {Form, Toast} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import checkTokenService from "../../checkToken";
import {withRouter} from "react-router-dom";



function Offer (props){

        const [description, setDescription] = useState('');
        const [location, setLocation] = useState('');
        const [tag, setTag] = useState('');
        const [toastMessage, setToastMessage] = useState('')
        const [isInvalid, setIsInvalid] = useState(false);

        function handleSubmit(e){
            e.preventDefault();
            postOffer().then(res => {
                console.log('done');
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
                    username: localStorage.getItem("currentUsername")
                };
                if(!validateInput(params)){
                    setIsInvalid(true);
                    setToastMessage('Description cannot be left empty.')
                    return;
                }
                axios.post("http://localhost:8000/dashboard/offer", params, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("access")
                    },
                }).then(res => {
                    props.history.push('/dashboard');
                })
            })
        }


        return(
            <div>
                {props.header}
                <Sidebar/>

                <div className={"offerWrapper"}>
                    <div className={"offerOverlay"}>
                        <Jumbotron className={"offerJumbotron"}>
                            <Form onSubmit={handleSubmit}>
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
            </div>
        )
}

export default withRouter(Offer);