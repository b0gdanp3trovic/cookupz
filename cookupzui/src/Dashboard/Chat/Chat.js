import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Header from "../../AppBar/HeaderMain/Header";
import {withRouter} from "react-router-dom";
import axios from "axios";
import './Chat.css'
import checkTokenService from "../../checkToken";
import WebSocketInstance from "../../websocket";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons'
import {Web} from "@material-ui/icons";
import Alert from "react-bootstrap/Alert";

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            activeIndex: -1,
            typedMessage: ""
        };
        this.getChats();
        this.click = this.click.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.messagesEndRef = undefined;
        library.add(faPaperPlane);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.messagesEndRef){
            this.messagesEndRef.scrollIntoView({behavior:"smooth"})
        }
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


    getReceiver(chat){
        const username = localStorage.getItem("currentUsername");
        let result =  chat.participants.filter(el => el.username !== username);
        if(result[0])
            return result[0].username;
        else return ""
    }

     waitForSocketConnection(callback){
        return new Promise((resolve) => {
            setTimeout(
                ()  =>  {
                    if(WebSocketInstance.state() === 1){
                        resolve('yay');
                        callback()
                    } else {
                        this.waitForSocketConnection(callback);
                    }
                }, 500
            )
        })
    };

    displayMessages(){
        return(
            this.state.messages.map((message, i) => {
                console.log(message);
                const username = localStorage.getItem("currentUsername");
                if(message.receiver === username){
                    return (
                        <div key={i} className="incoming_msg">
                            <div className="incoming_msg_img"><img
                                src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/></div>
                            <div className="received_msg">
                                <div className="received_withd_msg" ref={(el) => this.messagesEndRef = el}>
                                    <p>{message.content}</p>
                                    <span className="time_date">{message.timestamp}</span></div>
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div key={i} className="outgoing_msg">
                            <div className="sent_msg" ref={(el) => this.messagesEndRef = el}>
                                <p>{message.content}</p>
                                <span className="time_date">{message.timestamp}</span></div>
                        </div>
                    )
                }
            })
        )
    }

    renderMessages(i){

        let chatId = this.state.selectedChat.id;
        WebSocketInstance.connect(chatId);
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks((data) => this.setState({messages: data, fetchedMessages:true}), (data) => {
                this.setState({messages : [...this.state.messages, data]});
            });
            WebSocketInstance.fetchMessages(chatId);
        });
        return (
            this.state.fetchedMessages && this.displayMessages()
        )
    }

    click(){
        this.renderMessages()
    }

    handlePress(e){
        if(e.key === 'Enter'){
            this.sendMessage();
        }
    }

    sendMessage(){
        const messageToSend = this.state.typedMessage;
        this.setState({
            typedMessage: ''
        });
        let chatId = this.state.selectedChat.id;
        let receiver = this.getReceiver(this.state.selectedChat);
        const messageObj = {
            author : localStorage.getItem("currentUsername"),
            receiver: receiver,
            message: messageToSend,
            chat_id : chatId,
        };
        WebSocketInstance.newChatMessage(messageObj);
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
                                                 onClick={() => this.setState({
                                                     selectedChat: this.state.chats[i],
                                                     activeIndex: i
                                                 }, this.click)}>
                                                <div className="chat_people">
                                                    <div className="chat_img"><img
                                                        src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
                                                    </div>
                                                    <div className="chat_ib">
                                                        <h5>{this.renderParticipant(chat)} <span className="chat_date"></span></h5>
                                                        <p>{chat.messages[chat.messages.length-1] && chat.messages[chat.messages.length-1].content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }, this)}
                                </div>
                            </div>
                            <div className="mesgs">
                                <div className="msg_history">
                                    {this.state.fetchedMessages && this.displayMessages()}
                                    {!this.state.fetchedMessages && <div>
                                        <Alert variant={"warning"}>
                                            Choose user on the left and start chatting!
                                        </Alert>
                                    </div>}
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input value={this.state.typedMessage}
                                               onChange={(e) => this.setState({typedMessage: e.target.value})}
                                               type="text" className="write_msg"
                                               placeholder="Type a message"
                                               onKeyPress={(e) => this.handlePress(e)}

                                        />
                                        <button className="msg_send_btn" type="button" onClick={this.sendMessage}>
                                            <FontAwesomeIcon icon={["far", "paper-plane"]} aria-hidden="true"/></button>
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