import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Header from "../../AppBar/HeaderMain/Header";
import {withRouter} from "react-router-dom";
import axios from "axios";
import './Chat.css'
import checkTokenService from "../../checkToken";
import WebSocketInstance from "../../websocket";

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            activeIndex: -1
        }
        this.getChats();
    }

    getChats(){
        const accessToken = localStorage.getItem("access");
        return checkTokenService.validateToken(accessToken).then(res => {
            const param = {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access")
                },
            };
            axios.get("http://localhost:8000/chat/list/" + localStorage.getItem("currentUsername"), param).then(res => {
                this.setState({chats: res.data});
                this.setState({dataLoaded: true});
                console.log(this.state.chats)
            })
        })
    }

    renderParticipant(chat){
        const username = localStorage.getItem("currentUsername");
        let result =  chat.participants.filter(el => el.username !== username);
        if(result[0])
            return result[0].first_name + " " + result[0].last_name;
        else return ""
    }

     waitForSocketConnection(){
        return new Promise((resolve) => {
            setTimeout(
                ()  =>  {
                    if(WebSocketInstance.state() === 1){
                        resolve('yay');
                    } else {
                        this.waitForSocketConnection();
                    }
                }, 350
            )
        })
    };

    renderMessages(){
        console.log(this.state.selectedChat);
        //WebSocketInstance.connect();
        //this.waitForSocketConnection()
        return (
            <div className="incoming_msg">
                <div className="incoming_msg_img"><img
                    src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/></div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>Test which is a new approach to have all
                            solutions</p>
                        <span className="time_date"> 11:01 AM    |    June 9</span></div>
                </div>
            </div>
        )
    }

    render() {
        return(
            <div>
                <Sidebar/>
                <Header/>
                {this.state.dataLoaded &&
                <div className="chatContainer">
                    <h3 >className=" ext-center"></h3>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar" placeholder="Search"/>
                                            <span className="input-group-addon">
                                            <button type="button"> <i className="fa fa-search" aria-hidden="true"/> </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"inbox_chat"}>
                                    {this.state.chats.map((chat, i)=> {
                                        return (
                                            <div key={i} className={this.state.activeIndex === i ? "active_chat" : "chat_list"}
                                                 onClick={() => this.setState(
                                                     {
                                                         selectedChat: this.state.chats[i],
                                                        activeIndex: i,
                                                     })}>
                                                <div className="chat_people">
                                                    <div className="chat_img"><img
                                                        src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
                                                    </div>
                                                    <div className="chat_ib">
                                                        <h5>{this.renderParticipant(chat)} <span className="chat_date"></span></h5>
                                                        <p>{chat.messages[0] && chat.messages[0].content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="mesgs">
                                <div className="msg_history">
                                    {this.state.selectedChat && this.renderMessages()}
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input type="text" className="write_msg" placeholder="Type a message"/>
                                        <button className="msg_send_btn" type="button">
                                            <i className="fa fa-paper-plane-o" aria-hidden="true"/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> }


            </div>
        )
    }
}

export default withRouter(Chat);