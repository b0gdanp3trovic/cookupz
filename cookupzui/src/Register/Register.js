import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import './Register.css'
import {Link} from "react-router-dom";


function Register(props) {
    const[email, setEmail] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[dateOfBirth, setDateOfBirth] = useState("");

    console.log(props);




    function validateForm () {
        return email.length > 0 && firstName.length > 0 && lastName.length > 0 && username.length > 0
            && password.length > 0 && dateOfBirth.length > 0;
    }

    function handleSubmit(e){
        e.preventDefault();
        const regParam = {
            email:email,
            firstname: firstName,
            lastname: lastName,
            username: username,
            password: password,
            date_of_birth: dateOfBirth
        };
        console.log(regParam);
        axios.post('http://localhost:8000/users/register', regParam).then(
            res => {
                props.history.push('/');
            }
        )
    }

    return (
        <div>
            {props.header}
            <div className={"register"}>
                <h2 className={"regHeader"}>Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            autoFocus
                            placeholder={"First name"}
                            value = {firstName}
                            onChange = {e => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                    <Form.Control
                        autoFocus
                        placeholder={"Last name"}
                        value = {lastName}
                        onChange = {e => setLastName(e.target.value)}
                    />
                </Form.Group>
                    <Form.Group>
                        <Form.Control
                            autoFocus
                            placeholder={"Username"}
                            value = {username}
                            onChange = {e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            autoFocus
                            placeholder={"Email"}
                            value = {email}
                            onChange = {e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            autoFocus
                            placeholder={"Date of birth"}
                            value = {dateOfBirth}
                            onChange = {e => setDateOfBirth(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group  >
                        <Form.Control
                            type={"password"}
                            autoFocus
                            placeholder={"Password"}
                            value = {password}
                            onChange = {e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block  type="submit" >
                        Register
                    </Button>
                </Form>
                <div className={"linkContainer"}>
                    <Link to={"/"} className={"loginLink"}>Already have an account?</Link>
                </div>
            </div>


        </div>

    )
}

export default withRouter(Register);