import React, {useState} from 'react'
import Sidebar from "../SideBar/Sidebar";
import './Profile.css'
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import axios from "axios";


class Profile extends  React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userAuthenticated: false,
            currentUsername: localStorage.getItem("currentUsername"),
            token: localStorage.getItem("token")
        };

        this.user = {};

    }

     getUserInfo () {
        const param = {
            headers: {
                "Authorization": "JWT " + this.state.token
            },
            username: this.state.currentUsername
        };
        return axios.get("http://localhost:8000/dashboard/profile", param);
    }



    async componentDidMount() {
        const profile = await this.getUserInfo();
        this.setState({profile: profile.data[0]});
        console.log(this.state);
    }


    render() {
        if(!this.state.profile) {
            return <div/>
        }

        const wallpaper = require('../../assets/holder.jpg');
        console.log(this.state.currentUsername);

        return (
            <div>
                {this.props.header}
                <Sidebar/>
                <div className={"containerProfile"}>
                    <div className={"userProfile"}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={wallpaper} />
                            <Card.Body>
                                <Card.Title>{this.state.profile.user.firstname + " " + this.state.profile.user.lastname}</Card.Title>
                                <Card.Text>
                                    Najjači kuvar u ovom hoodu brt.
                                </Card.Text>
                            </Card.Body>
                            <div className={"actions"}>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem action>Message</ListGroupItem>
                                    <ListGroupItem action>Invite to a cookup</ListGroupItem>
                                    <ListGroupItem action>Block Bogdan</ListGroupItem>
                                </ListGroup>
                            </div>
                        </Card>
                    </div>
                    <div className={"userInfo"}>
                        <Card className="bio">
                            <Card.Header className={"bioHeader"}>Bio</Card.Header>
                            <Card.Body className="cardBody">
                                <Card.Text>
                                    Radio kao kuvar kod am ama ispred grizlija i posvadjo se sa glavnim kuvarom
                                    jer mi reko da sam majmun i evo sad trazim.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card tag={"div"} className="bio">
                            <Card.Header className={"bioHeader"}>Experience</Card.Header>
                            <Card.Body className="cardBody">
                                <Card.Text>
                                    <ListGroup className={"experience"} variant="flush">
                                        <ListGroup.Item tag={"div"} className={"experienceItem"}>Arabika lmao</ListGroup.Item>
                                        <ListGroup.Item tag={"div"} className={"experienceItem"}>Am am</ListGroup.Item>
                                        <ListGroup.Item tag={"div"} className={"experienceItem"}>Grizli</ListGroup.Item>
                                        <ListGroup.Item tag={"div"} className={"experienceItem"}>Kurac</ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="text-center interests">
                            <Card.Header>Interests</Card.Header>
                            <Card.Body className="cardBody">
                                <Card.Text>
                                    Spicy, Italian, Chinese, Indian, Roštilj
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;