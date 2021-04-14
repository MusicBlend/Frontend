import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useDispatch } from 'react-redux'
import { setId } from './idSlice';
import { setUsername } from './usernameSlice';
import  store  from "../app/store.js";

import Join from './Join';
import Create from './Create';

export function Communities() {
    const [accessToken, getAccessToken] = useState();
    const [userId, getUserId] = useState('');
    const [name, getName] = useState('');
    const [ chat, setChat ] = useState([]);
    const [ connection, setConnection ] = useState(null);


    const latestChat = useRef(null);
    latestChat.current = chat;

    const dispatch = useDispatch()
    const db = store.getState();
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");
        fetch("https://localhost:5002/SpotifyAuthentication/" + code)
        .then(results => results.json())
        .then(res => {
            getAccessToken(res)

            fetch("https://localhost:5002/SpotifyAuthentication/id/" + res)
            .then(response => response.json())
            .then(resp => {
                dispatch(
                    setId(resp)
                )
                getUserId(resp)
            });

            fetch("https://localhost:5002/SpotifyAuthentication/name/" + res)
            .then(response => response.json())
            .then(resp => {
                dispatch(
                    setUsername(resp)
                )
                getName(resp)
            });
        });

        
    },)
    
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
                    
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    

    async function createRoom(communityName){
        
        if (connection.connectionStarted) {
            try {
                await connection.send('CreateCommunity', communityName, `${db.id}`, `${db.username}`);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    async function getUsername(){
        const response = await fetch("https://localhost:5002/SpotifyAuthentication/name/" + accessToken);
        const data = await response.json();
        getName(data);
    }

    return(
        <center>
            <div>             
                <Join getUsername={getUsername}/>
                <br/>
                <Create createRoom={createRoom}/>
                <hr/> 
                <p>
                    <h2>{userId}</h2>
                    <h2>{name}</h2>
                </p> 
            </div>
        </center>    
    );   
}

export default Communities;