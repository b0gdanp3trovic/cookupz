import React, {useContext, useState} from 'react'
import Register from "../Register/Register";
import {Form, Button, Toast} from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import './Login.css'
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import {AppContext} from "../contexts/AppContext";



function Login (props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validInfo, setValidInfo] = useState();
    const [toastMessage, setToastMessage] = useState("");
    const [attemptedLogin, setAttemptedLogin] = useState(false);
    const {value, setValue} = useContext(AppContext);

    let validateForm = e => {
        return username.length > 0 && password.length > 0;
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
            username: username,
            password: password,
        };
        axios.post('http://localhost:8000/users/token/obtain', logParam).then(res => {
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            const logParamWithToken = {
                username: username,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            };
            return axios.get('http://localhost:8000/users/currentUser', logParamWithToken).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("currentUsername", res.data.username);
                props.history.push('/dashboard')
            }).catch(
                error => {
                    setAttemptedLogin(true);
                    setValidInfo(false);
                    if(error.response && error.response.data.response){
                        setToastMessage(error.response.data.response);
                    } else if(error.response.status === 401) {
                        setToastMessage(error.response.data.detail);
                    }
                    else {
                        setToastMessage("Network error.")
                    }
                }
            )
        })

        //axios.post('http://localhost:8000/users/login', logParam).then(
        //    res => {
        //        setValidInfo(true);
        //        setToastMessage(res.data.response);
        //        setValue({currentUserId: res.data.currentUserId});
        //        localStorage.setItem("currentUsername", res.data.username);
        //        localStorage.setItem("token", res.data.token);
        //        console.log(res.data.username);
        //        props.history.push('/dashboard');
        //    }
        //).catch(
        //    error => {
        //        setAttemptedLogin(true);
        //        setValidInfo(false);
        //        if(error.response && error.response.data.response){
        //            setToastMessage(error.response.data.response);
        //        } else {
        //            setToastMessage("Network error.")
        //        }
        //    }
        //)
    };

    return (
        <div className={"container"}>
            <Jumbotron className={"lJumbotron"}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            placeholder = {"Username"}
                            value = {username}
                            onChange = {e => setUsername(e.target.value)}
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
            <div className={"linkContainerRegister"}>
                <Link to={"/register"} className={"registerLink"}>Don't have an account? Register here!</Link>
            </div>
        </div>

    )


}

export default withRouter(Login);


