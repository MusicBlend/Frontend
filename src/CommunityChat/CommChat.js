import { useParams } from 'react-router';
import { HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState, useRef } from 'react';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

export function CommChat() {
    let { commId } = useParams();
    let { userId } = useParams();

    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    const [ communityData, setcommunityData ] = useState({
        id: "",
        communityName: "",
        roomCode: "",
        messages: [],
        users: []
    });

    useEffect(() => {
        fetch(`https://localhost:5001/GetById/${commId}`)
        .then(results => results.json())
        .then(res =>{
            setcommunityData(res);
        });
    }, []);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                        console.log(message);
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        if (connection.connectionStarted) {
            try {
                await connection.send('SendMessageToCommunity', "1c44b475-7a70-405c-ab28-f402e0e75cd4" ,  chatMessage);
                
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return (
        <div>
            <div>
                <h3>ID: {communityData.id}</h3>
                <h3>communityName: {communityData.communityName}</h3>
                <h3>roomCode: {communityData.roomCode}</h3>
                <h3>{userId}</h3>
            </div>
                <div>
                <ChatInput sendMessage={sendMessage} />
                <hr />
                <ChatWindow chat={chat}/>
            </div>
        </div>
        
    );
};


export default CommChat;