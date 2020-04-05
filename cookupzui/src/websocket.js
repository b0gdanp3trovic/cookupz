import {parse} from "@fortawesome/fontawesome-svg-core";

class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if(!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(chatId){
        const path = 'ws://localhost:8000/ws/chat/' + chatId + '/';
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log('websocket opened')
        };
        this.socketRef.onmessage = (data) => {
             console.log(data);
            this.socketNewMessage(data);
        };
        this.socketRef.onerror = (e) => {
            console.log(e.message);
        }
        this.socketRef.onclose = () => {
            console.log('websocket disconnected');
            this.connect();
        }

    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data.data);
        console.log(parsedData.message);
        const command = parsedData.command;
        if(Object.keys(this.callbacks).length === 0){
            return;
        }
        if(command === 'messages'){
            this.callbacks[command](parsedData.messages)
        }
        if(command === 'new_message') {
            parsedData.message.receiver = parsedData.to;
            this.callbacks[command](parsedData.message)
        }
    }

    fetchMessages(chatId){
        this.sendMessage({command: 'fetch_messages', chat_id: chatId})
    }

    newChatMessage(message){
        this.sendMessage({
            command: 'new_message',
            from:message.author,
            message: message.message,
            chat_id: message.chat_id,
            to: message.receiver
        })
    }

    addCallbacks(messagesCallback, newMessageCallback){
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data){
        try{
            console.log(data)
            this.socketRef.send(JSON.stringify({...data}));
        } catch (e) {
            console.log(e);
        }
    }

    state() {
        return this.socketRef.readyState;
    }




}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;