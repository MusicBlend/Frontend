import React, { useState } from 'react';

const Join = (props) => {
    const [communityCode, setcommunityCode] = useState('');
    const onSubmit = (e) =>{
        e.preventDefault();

        const isCodeProvided = communityCode && communityCode !== "";

        if(isCodeProvided){
            props.joinCommunity(communityCode)
        }else{
            alert('Please insert a community code');
        }
    }

    const onCommunityCodeUpdate = (e) => {
        setcommunityCode(e.target.value);
    }
    return(
        <form onSubmit={onSubmit}>
           <button className="btn btn-primary">Join a Community</button>
           <br/>
           <br/>
           <input
                id = "communityCode"
                name = "communityCode"
                placeholder = "Enter a community code"
                value = {communityCode}
                onChange = {onCommunityCodeUpdate} />
        </form>
    )
};

export default Join;