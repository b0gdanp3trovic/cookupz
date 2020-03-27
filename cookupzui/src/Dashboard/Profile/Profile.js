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
            token: localStorage.getItem("access"),
            currentUsername: localStorage.getItem("currentUsername"),
            user: JSON.parse(localStorage.getItem("user")),
            editMode: false,
            myProfile: false
        };

        this.user = {};

    }

     getUserInfo () {
        const param = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
        };
        return axios.get("http://localhost:8000/dashboard/profile/" + this.state.currentUsername, param);
    }



    async componentDidMount() {
        const profile = await this.getUserInfo();
        this.setState({profile: profile.data[0]});
        if(localStorage.getItem("currentUsername") === this.state.user.username) {
            this.setState({myProfile: true});
        }
    }



    renderPhoto () {
        const wallpaper = require('../../assets/holder.jpg');
        const addImage = require('../../assets/add_image.jpg');
        if(this.state.myProfile) {
            if(this.state.profile.photo) {
                return  (<Card.Img variant="top" src={wallpaper} />);
            } else if (this.state.editMode) {
                return (<Card className={"noPhotoCard"}><Button className={"addPhotoButton"}
                                                                variant="secondary">Add image</Button>{' '}</Card>)
            } else {
                return (<Card className={"noPhotoCard"}><div>No photo added.</div></Card>)
            }
        }
    }

    renderBio() {
        const addButton = require('../../assets/add-button.png');
        if(this.state.myProfile) {
            if(this.state.profile.bio) {
                return(<div>{this.state.profile.bio}</div>)
            } else if (this.state.editMode) {
                return (<div className={"addButton"}><img className={"addButton"} src={addButton}/></div>)
            } else {
                return (<div>No bio added.</div>)
            }
        }
    }

    render() {
        if(!this.state.profile) {
            return <div/>
        }

        const addButton = require('../../assets/add-button.png');



        return (
            <div>
                {this.props.header}
                <Sidebar/>
                <div className={"containerProfile"}>
                    <div className={"userProfile"}>
                        <Card style={{ width: '18rem' }}>
                            {this.renderPhoto()}
                            <Card.Body>
                                <Card.Title>{this.state.user.first_name + " " + this.state.user.last_name}</Card.Title>
                                <Card.Text>
                                    Najjači kuvar u ovom hoodu brt.
                                </Card.Text>
                            </Card.Body>
                            <div className={"actions"}>
                                <ListGroup className="list-group-flush">
                                    {this.state.myProfile && <ListGroupItem action onClick={ () => {this.setState({editMode: !this.state.editMode})}}>
                                        {this.state.editMode ?
                                             (<div>Done</div>) :   (<div>Edit profile</div>)
                                        }
                                    </ListGroupItem>}
                                    {!this.state.myProfile && <ListGroupItem action>Message</ListGroupItem>}
                                    {!this.state.myProfile && <ListGroupItem action>Invite to a cookup</ListGroupItem>}
                                    {!this.state.myProfile && <ListGroupItem action>Block Bogdan</ListGroupItem>}
                                </ListGroup>
                            </div>
                        </Card>
                    </div>
                    <div className={"userInfo"}>
                        <Card className="bio">
                            <Card.Header className={"bioHeader"}>Bio</Card.Header>
                            <Card.Body className="cardBody">
                                <Card.Text>
                                    {this.renderBio()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card tag={"div"} className="bio">
                            <Card.Header className={"bioHeader"}>Experience</Card.Header>
                            <Card.Body className="cardBodyXp">
                                <Card.Text>
                                    <ListGroup className={"experience"} variant="flush">
                                        <ListGroup.Item tag={"div"} className={"experienceItem"}>Arabika lmao</ListGroup.Item>
                                        <ListGroup.Item tag={"div"} className={"experienceItem"}>Am am</ListGroup.Item>
                                        <ListGroup.Item tag={"div"} className={"experienceItem"}>Grizli</ListGroup.Item>
                                        <ListGroup.Item tag={"div"} className={"experienceItem"}>Kurac</ListGroup.Item>
                                        {this.state.editMode && <ListGroup.Item tag={"div"} className={"experienceItemAdd"}>
                                            <div className={"addButton"}><img className={"addButton"} src={addButton}/></div>
                                        </ListGroup.Item>}
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