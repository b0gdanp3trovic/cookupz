import React, {useState} from 'react'
import Sidebar from "../SideBar/Sidebar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import './Offer.css'
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";


export default function Offer (props){

        const [description, setDescription] = useState('');
        const [location, setLocation] = useState('');
        const [tag, setTag] = useState('');

        function handleSubmit(){

        }



        return(
            <div>
                {props.header}
                <Sidebar/>

                <div className={"offerWrapper"}>
                    <Jumbotron className={"offerJumbotron"}>
                        <Form onSubmit={handleSubmit()}>
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
                                        placeholder = {"Location:"}
                                        value = {location}
                                        onChange = {e => setLocation(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as = {Col}>
                                    <Form.Control
                                        placeholder = {"Tag:"}
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
            </div>
        )
}