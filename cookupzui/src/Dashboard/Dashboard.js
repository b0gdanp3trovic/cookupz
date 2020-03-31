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



function Dashboard (props) {
    useEffect(() => {
        const accessToken = localStorage.getItem("access")
        checkTokenService.validateToken(accessToken).then(res => {
            const param = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            };
            axios.get("http://localhost:8000/dashboard/offer", param).then(res => {
                setState(res.data);
                setDataLoaded(true)
            })
        })
    }, []);

    const[state, setState] = useState();
    const[dataLoaded, setDataLoaded] = useState(false);


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
                                                                <Card.Img  src={item.profile.photo_url} />
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
                                                <Button size="sm" variant="outline-secondary">I'm interested</Button>{' '}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                        )
                    })}
                    </div>
                </div>
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


