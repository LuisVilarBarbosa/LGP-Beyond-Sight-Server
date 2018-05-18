import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Message from './Message';

const socketUrl = "http://localhost:3231"

export default class Chatroom extends Component {
    socket = {};

    constructor(props) {
        super(props);

        this.state = {
            chats: [],
            username: "Null",
            socket: null,
        };
        
        this.submitMessage = this.submitMessage.bind(this);

    }

    componentWillMount(){
        this.initSocket()
    }

    initSocket = () =>{
        const socket = io(socketUrl)

        socket.on('connect', ()=>{
            console.log("Connected to chat_server");
        })

        socket.on("SendAll", (allMessages) =>{
            Object.entries(allMessages).map(([key, value])=>{
                this.setState({
                    chats: []
                })
                value.map(el => {
                    this.setState({
                        chats: this.state.chats.concat([{
                            username: el.username,
                            content: <p>{el.content.props.children}</p>,
                        }])
                    })
                    return 1;
                })
                return 1;
            })
        })

        this.setState({socket})

        
    }

    componentDidMount() {
        if(this.state.username !== "Null"){
            this.scrollToBot();
        }
            
    }
    
    componentDidUpdate() {
        if(this.state.username !== "Null"){
            this.scrollToBot();
        }
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();
        
        if(ReactDOM.findDOMNode(this.refs.msg).value){
            this.setState({
                chats: this.state.chats.concat([{
                    username: this.state.username,
                    content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                }])
            }, () => {
                ReactDOM.findDOMNode(this.refs.msg).value = "";
    
                this.state.socket.emit("SendMessage",this.state.chats)
            });
        }

    }

    submitUsername(e) {
        e.preventDefault();
        
        if(ReactDOM.findDOMNode(this.refs.user).value){
            this.setState({
                username: ReactDOM.findDOMNode(this.refs.user).value
            }, () => {
                ReactDOM.findDOMNode(this.refs.msg).value = "";
            });
        }
        
    }

    render() {
        const { chats } = this.state;

        if(this.state.username === "Null"){
            return(
                <div className="chatroom">
                    <h3>ChatTime</h3>
                    <h5>Please enter username:</h5>
                    <form className="input" onSubmit={(e) => this.submitUsername(e)}>
                        <input type="text" ref="user" placeholder="Please enter username"/>
                        <input type="submit" value="Submit" />
                    </form>

                </div>
            );
        }
        else{
            return (
                <div className="chatroom">
                    <h3>ChatTime</h3>
    
                    <ul className="chats" ref="chats">
                        {
                            chats.map((chat, i) => 
                                <Message key={i} chat={chat} user={this.state.username} />
                            )
                        }
                    </ul>
                    <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                        <input type="text" ref="msg"  placeholder="Please enter text"/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
        
    }
}