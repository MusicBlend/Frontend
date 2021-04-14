import React, { useState } from 'react';

const Join = (props) => {
    const [communityName, setcommunityName] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();

        const isCodeProvided = communityName && communityName !== "";

        if(isCodeProvided){
            props.createRoom(communityName);
        }else{
            alert('Please insert a community name');
        }
    }

    const onCommunityNameUpdate = (e) => {
        setcommunityName(e.target.value);
    }
    return(
        <form  onSubmit={onSubmit}>
           <button className="btn btn-primary">Create a Community</button>
           <br/>
           <br/>
           <input
                id = "communityName"
                name = "communityName"
                placeholder = "Create a community name"
                value = {communityName}
                onChange = {onCommunityNameUpdate} />
        </form>
    )
};

export default Join;