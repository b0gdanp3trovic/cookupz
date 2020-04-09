import React, {useEffect, useState} from 'react'
import Sidebar from "../SideBar/Sidebar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import './Offer.css'
import {Form, Toast} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import checkTokenService from "../../checkToken";
import {withRouter} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import OfferModal from "../../Modal/OfferModal/OfferModal";



function Offer (props){

    const [state, setState] = useState('');
    const [dataLoaded, setDataLoaded] = useState();
    const [data, setData] = useState({});
    const[showModal, setShowModal] = useState(false);

    function editState(data) {
        setState({data: data})
    }

    function handleClose(){
        setShowModal(false);
        console.log(this.state)
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("access");
        checkTokenService.validateToken(accessToken).then(res => {
            const param = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            };
            axios.get("http://localhost:8000/dashboard/offer/" + localStorage.getItem("currentUsername"), param).then(res => {
                editState(res.data)
            })
        }).catch(() => {
            props.history.push('/');
        })
    }, []);





        return(
            <div>
                {props.header}
                <Sidebar/>

                <div className={"offerWrapper"}>
                    <div className={"offerOverlay"}>
                        <Card className={"offerCard"}>
                            <Card.Header className={"myOfferHeader"}>My offers</Card.Header>
                            <ListGroup.Item action className={"newOfferButton"} >
                                <div className={"newOfferWrap"} onClick={() => {
                                    setShowModal(!showModal);
                                    console.log(showModal);
                                }}>
                                    New offer
                                </div>
                            </ListGroup.Item>
                            <ListGroup variant="flush">
                                {state.data && state.data.map((item, i) => {
                                    return(
                                        <ListGroup.Item key={i} className={"offerListItem"}>
                                            <Card
                                                bg="light"
                                                style={{ width: '90%' }}
                                            >
                                                <Card.Header className={"subCardHeader"}>{item.title}</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {item.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Table striped bordered hover variant="light">
                                                    <tbody>
                                                    <tr>
                                                        <td>{item.location}</td>
                                                        <td>{item.tag}</td>
                                                        <td class={"interested"}>15 interested</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </Card>
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        </Card>
                    </div>
                </div>
                <OfferModal show={showModal} handleClose={() => {setShowModal(!showModal)}}/>
            </div>
        )
}

export default withRouter(Offer);