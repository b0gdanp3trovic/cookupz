import React, {useState} from 'react'
import Sidebar from "../SideBar/Sidebar";
import './Profile.css'
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Form from 'react-bootstrap/Form'
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import axios from "axios";
import checkTokenService from "../../checkToken";
import PhotoModal from "../../Modal/PhotoModal/PhotoModal";
import {withRouter} from "react-router-dom";


class Profile extends  React.Component {


    constructor(props) {
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
            showPhotoModal: false,
            photoUploaded: false,
            location: ''
        };

        this.location = '';

        this.user = {};
        this.getUserInfo = this.getUserInfo.bind(this);
        this.updateProfile = this.updateProfile.bind(this);

        props.history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            var profileRegex = new RegExp('.profile.')
            if(profileRegex.test(location.pathname)){
                window.location.reload();
            }
        })
    }



     getUserInfo () {
        const accessToken = localStorage.getItem("access");
        return checkTokenService.validateToken(accessToken).then(res => {
            const param = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            };
            console.log(this.state);
            axios.get("http://localhost:8000/dashboard/profile/" + this.state.profileUsername, param).then(res => {
                if(res.data[0]){
                    this.setState({profile: res.data[0]});
                    this.setState({location: res.data[0].location});
                }
            })
        })
    }



    async componentDidMount() {
        this.getUserInfo().then(res => {
            if(localStorage.getItem("currentUsername") === this.state.profileUsername) {
                this.setState({myProfile: true});
            }
        })
    }



    renderPhoto () {
        const wallpaper = require('../../assets/holder.jpg');
        const addImage = require('../../assets/add_image.jpg');
        if(this.state.myProfile) {
            if(this.state.profile.photo_url) {
                if(this.state.editMode){
                    return (<div className={"changePhotoContainer"}>
                            <Card.Img className={"profilePic"} variant="top" src={this.state.profile.photo_url}>
                            </Card.Img>
                            <Button onClick={this.handleClose}  className={"changePhotoButton"}
                                                                    variant="secondary">Change image</Button>{' '}
                        </div>
                    )
                } else {
                    return  (<Card.Img className={"profilePic"} variant="top" src={this.state.profile.photo_url} />);
                }
            } else if (this.state.editMode) {
                return (<Card className={"noPhotoCard"}><Button onClick={this.handleClose}  className={"addPhotoButton"}
                                                                variant="secondary">Add image</Button>{' '}</Card>)
            } else {
                return (<Card className={"noPhotoCard"}><div>No photo added.</div></Card>)
            }
        } else {
            if(this.state.profile.photo_url) {
                return (<Card.Img className={"profilePic"} variant = "top" src = {this.state.profile.photo_url} />);
            } else {
                return (<Card className={"noPhotoCard"}><div>No photo added.</div></Card>)
            }
        }
    }



    updateProfile(){

        const accessToken = localStorage.getItem("access");
        return checkTokenService.validateToken(accessToken).then(res => {
            const param = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            };
            axios.put('http://localhost:8000/dashboard/profileedit/' + this.state.profile.id, this.state.profile, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                }
            }).then(res => {
                    console.log(res);
            })

        })

    }

    renderLocation(){
        const addButton = require('../../assets/add-button.png');
        if(this.state.myProfile){
            if(!this.state.editMode){
                return(<div>
                    {this.state.profile.location ? this.state.profile.location : "No location added."}
                </div>)
            } else {
                return(<div>
                    <Form.Group>
                        <div className={"editLocationWrapper"}>
                            <Form.Control size="sm" type="text" placeholder="Location"
                                          value = {this.state.profile.location}
                                          onChange = {e => {
                                              let location = e.target.value;
                                              this.setState((prevState) => ({
                                                profile: {
                                                    ...prevState.profile,
                                                    location: location
                                                },
                                              })
                                          )}}
                            />
                        </div>
                    </Form.Group>
                </div>)
            }
        } else {
            return(<div>
                {this.state.profile.location ? this.state.profile.location : "No locatio added."}
            </div>)
        }
    }

    renderBio() {
        const addButton = require('../../assets/add-button.png');
        if(this.state.myProfile) {
            if(!this.state.editMode) {
                return(
                    <div>
                        <div>{this.state.profile.bio ? this.state.profile.bio : "No bio added"}</div>
                    </div>
                )
            } else if (this.state.editMode) {
                return (<div className={"editBioText"}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows="3"
                                      value = {this.state.profile.bio}
                                      onChange = {e => {
                                          let bio = e.target.value;
                                          this.setState((prevState) => ({
                                                  profile: {
                                                      ...prevState.profile,
                                                      bio: bio
                                                  },
                                              })
                                          )}}/>
                    </Form.Group>
                </div>)
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
        this.setState({showPhotoModal: !this.state.showPhotoModal});
        console.log(this.state)
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
                                    {this.renderLocation()}
                                </Card.Text>
                            </Card.Body>
                            <div className={"actions"}>
                                <ListGroup className="list-group-flush">
                                    {this.state.myProfile && <ListGroupItem action onClick={() => {this.setState({editMode: !this.state.editMode})}}>
                                        {this.state.editMode ?
                                             (<div onClick={this.updateProfile}>Done</div>) :   (<div>Edit profile</div>)
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
                                <Card.Text className={"cardText"}>
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
                <PhotoModal onUploaded={this.getUserInfo} show={this.state.showPhotoModal} handleClose={this.handleClose}/>
            </div>
        );
    }
}

export default withRouter(Profile);