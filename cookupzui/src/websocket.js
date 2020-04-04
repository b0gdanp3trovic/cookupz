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

    connect(){
        const path = 'ws://localhost:8000/ws/chat/3/';
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log('websocket opened')
        };
        this.socketRef.onmessage = () => {
            // sending a message
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
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if(Object.keys(this.callbacks).length === 0){
            return;
        }
        if(command === 'messages'){
            this.callbacks[command](parsedData.messages)
        }
        if(command === 'new_message') {
            this.callbacks[command](parsedData.message)
        }
    }

    fetchMessages(username){
        this.sendMessage({command: 'fetch_messages', username: username})
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