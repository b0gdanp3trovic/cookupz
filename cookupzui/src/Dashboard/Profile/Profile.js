import React, {useState} from 'react'
import Sidebar from "../SideBar/Sidebar";
import './Profile.css'
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";


class Profile extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userAuthenticated: false,
            currentUser: {},
        }
    }

    getUserInfo () {
        return new Promise(function (resolve, reject) {
            
        })
    }



    componentDidMount() {
        const userId = this.props.currentUserId;
    }


    render() {
        const wallpaper = require('../../assets/holder.jpg');

        return (
            <div>
                {this.props.header}
                <Sidebar/>
                <div className={"containerProfile"}>
                    <div className={"userProfile"}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={wallpaper} />
                            <Card.Body>
                                <Card.Title>Bogdan Petrović</Card.Title>
                                <Card.Text>
                                    Najjači kuvar u ovom hoodu brt. Kuvam sve redom od paprika do kurvi.
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
                                    jer mi reko da nisam za kurac i evo sad trazim nekog da karam ovde.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="bio">
                            <Card.Header className={"bioHeader"}>Experience</Card.Header>
                            <Card.Body className="cardBody">
                                <Card.Text>
                                    <ListGroup className={"experience"} variant="flush">
                                        <ListGroup.Item className={"experienceItem"}>Arabika lmao</ListGroup.Item>
                                        <ListGroup.Item className={"experienceItem"}>Am am</ListGroup.Item>
                                        <ListGroup.Item className={"experienceItem"}>Grizli</ListGroup.Item>
                                        <ListGroup.Item className={"experienceItem"}>Kurac</ListGroup.Item>
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