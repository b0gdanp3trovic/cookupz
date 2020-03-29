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
import checkTokenService from "../../checkToken";
import PhotoModal from "../../Modal/PhotoModal/PhotoModal";


class Profile extends  React.Component {


    constructor(props) {
        console.log(props.match.params.id)
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            userAuthenticated: false,
            token: localStorage.getItem("access"),
            currentUsername: localStorage.getItem("currentUsername"),
            user: JSON.parse(localStorage.getItem("user")),
            editMode: false,
            myProfile: false,
            profileUsername: props.match.params.id,
            showPhotoModal: false
        };

        this.user = {};

    }

     getUserInfo () {
        const accessToken = localStorage.getItem("access");
        return checkTokenService.validateToken(accessToken).then(res => {
            const param = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            };
            axios.get("http://localhost:8000/dashboard/profile/" + this.state.profileUsername, param).then(res => {
                if(res.data[0]){
                    this.setState({profile: res.data[0]});
                }
            })
        })
    }



    async componentDidMount() {
        this.getUserInfo().then(res => {
            if(localStorage.getItem("currentUsername") === this.state.profileUsername) {
                console.log('yes')
                this.setState({myProfile: true});
            }
        })
    }



    renderPhoto () {
        const wallpaper = require('../../assets/holder.jpg');
        const addImage = require('../../assets/add_image.jpg');
        if(this.state.myProfile) {
            if(this.state.profile.photo) {
                return  (<Card.Img variant="top" src={wallpaper} />);
            } else if (this.state.editMode) {
                return (<Card className={"noPhotoCard"}><Button onClick={this.handleClose}  className={"addPhotoButton"}
                                                                variant="secondary">Add image</Button>{' '}</Card>)
            } else {
                return (<Card className={"noPhotoCard"}><div>No photo added.</div></Card>)
            }
        } else {
            if(this.state.profile.photo) {
                return (<Card.Img variant = "top" src = {wallpaper} />);
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
        } else {
            if(this.state.profile.bio){
                return(<div>{this.state.profile.bio}</div>)
            } else {
                return (<div>No bio added</div>)
            }
        }
    }

    handleClose(){
        console.log('haaa');
        this.setState({showPhotoModal: !this.state.showPhotoModal})
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
                                <Card.Title>{this.state.profile.user.first_name + " " + this.state.profile.user.last_name}, 22</Card.Title>
                                <Card.Text>
                                    Ljubljana, Slovenia
                                </Card.Text>
                            </Card.Body>
                            <div className={"actions"}>
                                <ListGroup className="list-group-flush">
                                    {this.state.myProfile && <ListGroupItem action onClick={() => {this.setState({editMode: !this.state.editMode})}}>
                                        {this.state.editMode ?
                                             (<div>Done</div>) :   (<div>Edit profile</div>)
                                        }
                                    </ListGroupItem>}
                                    {!this.state.myProfile && <ListGroupItem action>Message</ListGroupItem>}
                                    {!this.state.myProfile && <ListGroupItem action>Invite to a cookup</ListGroupItem>}
                                    {!this.state.myProfile && <ListGroupItem action>Block {this.state.profile.user.first_name}</ListGroupItem>}
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
                <PhotoModal show={this.state.showPhotoModal} handleClose={this.handleClose}/>
            </div>
        );
    }
}

export default Profile;