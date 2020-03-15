import React, {useContext, useState} from 'react'
import Register from "../Register/Register";
import {Form, Button, Toast} from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import './Login.css'
import axios from "axios";
import {withRouter} from "react-router-dom";
import {AppContext} from "../contexts/AppContext";



function Login (props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validInfo, setValidInfo] = useState();
    const [toastMessage, setToastMessage] = useState("");
    const [attemptedLogin, setAttemptedLogin] = useState(false);
    const {value, setValue} = useContext(AppContext);

    let validateForm = e => {
        return email.length > 0 && password.length > 0;
    };

    let handleSubmit = e => {
        e.preventDefault();
        if(!validateForm(e)){
            setAttemptedLogin(true);
            setToastMessage("No fields can be empty.");
            setValidInfo(false);
            return;
        }
        const logParam = {
            email: email,
            password: password
        };
        axios.post('http://localhost:8000/users/login', logParam).then(
            res => {
                setValidInfo(true);
                setToastMessage(res.data.response);
                setValue({currentUserId: res.data.currentUserId});
                props.history.push('/dashboard');
            }
        ).catch(
            error => {
                setAttemptedLogin(true);
                setValidInfo(false);
                if(error.response && error.response.data.response){
                    setToastMessage(error.response.data.response);
                } else {
                    setToastMessage("Network error.")
                }
            }
        )
    };

    return (
        <div className={"container"}>
            <Jumbotron className={"jumbotron"}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            placeholder = {"Email"}
                            value = {email}
                            onChange = {e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type={"password"}
                            placeholder = {"Password"}
                            value = {password}
                            onChange = {e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button className={"btn-danger"} block  type="submit" >
                        Log in
                    </Button>
                </Form>
            </Jumbotron>
            {attemptedLogin && !validInfo &&
            <Toast  className={"toastInvalid"}>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>}
        </div>

    )


}

export default withRouter(Login);


