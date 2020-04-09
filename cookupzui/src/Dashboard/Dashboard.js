import React, {useContext, useEffect, useState} from 'react'
import Sidebar from "./SideBar/Sidebar";
import {AppContext} from "../contexts/AppContext";
import axios from "axios";
import Card from "react-bootstrap/Card";
import './Dashboard.css'
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import checkTokenService from "../checkToken";
import {Link, withRouter} from "react-router-dom";
import InterestedModal from "../Modal/InterestedModal/InterestedModal";
import {forEach} from "react-bootstrap/cjs/ElementChildren";
import Alert from "react-bootstrap/Alert";



function Dashboard (props) {
    useEffect(() => {
        const accessToken = localStorage.getItem("access")
        checkTokenService.validateToken(accessToken).then(res => {
            const param = {
                username: localStorage.getItem("currentUsername"),
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            };
            axios.get("http://localhost:8000/dashboard/offerdash/" + localStorage.getItem("currentUsername"),  param).then(res => {
                setState(res.data);
                setDataLoaded(true)
            })
        }).catch(() => {
            props.history.push('/');
        })
    }, []);

    const[state, setState] = useState();
    const[dataLoaded, setDataLoaded] = useState(false);
    const[offerSelected, setOfferSelected] = useState(false);
    const[offer, setOffer] = useState({});

    function openModal(item){
        setOffer({
            username: item.profile.user.username,
            offer: item
        });
        setOfferSelected(true);
    }

    function interested(offer){
        const username = localStorage.getItem("currentUsername");
        console.log(offer.int_users.length)
        for(let i = 0; i < offer.int_users.length; i++){
            const otherUusername = offer.int_users[i].username
            console.log(otherUusername)
            if(username === otherUusername){
                return true;
            }
        }
        return false;
    }
    const wallpaper = require('../assets/holder.jpg');
    if(dataLoaded) {
        return(
            <div>
                {props.header}
                <Sidebar/>
                <div className={"postsContent"}>
                    <div className={"postWrapper"}>
                    {state.map((item, i) => {
                        const link = "/profile/" + item.profile.user.username;
                        return (
                            <div key={i} className={"postOverlay"}>
                                <Card body className={"cardBody"}>
                                        <Jumbotron className={"jumb"}>
                                            <div className={"post"}>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item >
                                                        <div className={"upperPart"}>
                                                            <div className={"photoWrapper"}>
                                                                <Card.Img className={"userProfilePicture"}  src={item.profile.photo_url} />
                                                            </div>
                                                            <div className={"name"}>
                                                                <Link to={"/profile/" + item.profile.user.username} className={"linkToProfile"} >
                                                                    {item.profile.user.first_name} {item.profile.user.last_name}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className={"location"}>
                                                            {item.location}
                                                        </div>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className={"textContainerGray"}>
                                                            <div className={"textContainerWhite"}>
                                                                <p className={"description"}>
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </div>
                                        </Jumbotron>
                                        <div className={"buttons"}>
                                            <div className={"button"}>
                                                {!interested(item) && <Button onClick={() => openModal(item)} size="sm" variant="outline-secondary">I'm interested</Button>}
                                                {interested(item) &&   <Alert className={"pendingWarning"} variant={"warning"}>Pending</Alert>}
                                            </div>
                                        </div>
                                    </Card>
                            </div>
                        )
                    })}
                    </div>
                </div>
                {offerSelected &&
                    <InterestedModal chosenUser={offer} show={offerSelected} handleClose={() => setOfferSelected(!offerSelected)}/>
                }
            </div>
        )
    } else {
        return (
            <div>
            {props.header}
            <Sidebar/>
        </div>
        )
    }

}

export default withRouter(Dashboard);


