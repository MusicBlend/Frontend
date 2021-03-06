import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useDispatch } from 'react-redux'
import { setId } from './idSlice';
import { setUsername } from './usernameSlice';
import  store  from "../app/store.js";

import Join from './Join';
import Create from './Create';
import Show from './Show';

export function Communities() {

    const [ chat, setChat ] = useState([]);
    const [ connection, setConnection ] = useState(null);
    const [ id, ID ] = useState();


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
            
            fetch("https://localhost:5002/SpotifyAuthentication/id/" + res)
            .then(response => response.json())
            .then(resp => {
                ID(resp)
                dispatch(
                    setId(resp)
                )
                
            });

            fetch("https://localhost:5002/SpotifyAuthentication/name/" + res)
            .then(response => response.json())
            .then(resp => {
                dispatch(
                    setUsername(resp)
                )
                
            });
        }); 
    },)
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    },[]);

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

    

    async function createCommunity(communityName){
        if (connection.connectionStarted) {
            try {
                await connection.send('CreateCommunity', communityName, `${db.id}`);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    async function joinCommunity(communityCode){
        if (connection.connectionStarted) {
            try {
                await connection.send('JoinCommunity', `${db.id}`, communityCode);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return(
        <center>
            <div>             
                <Join joinCommunity={joinCommunity}/>
                <br/>
                <Create createCommunity={createCommunity}/>
                <hr/>  
                <p>
                    <Show />
                </p> 
            </div>
        </center>    
    );   
}

export default Communities;