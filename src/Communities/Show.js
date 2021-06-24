import React, { useEffect, useState } from 'react';
//import { useDispatch } from 'react-redux'
import  store  from "../app/store.js";

const Show = (props) => {
    const [communities, getCommunities] = useState([]);
    const db = store.getState();

    useEffect(() => {
        fetch(`https://localhost:5001/GetCommunities/${db.id}`)
        .then(results => results.json())
        .then(res =>{
            getCommunities(res);
        });
    });

    return(
        <center>
        <div>
            <table class="table">
                <thead>
                <tr>
                    <center>
                        <th>Communities</th>
                    </center>
                </tr>
                </thead>
                <tbody>
                {communities.map(comm =>
                    // <tr key={comm}>
                    //     <td><Link to={`/communitychat/${comm}`}>{comm}</Link></td>  
                    // </tr>
                    // <button onClick = {<CommChat/>}>{comm}</button>
                    <center>
                    <tr>    
                        <button className="btn">
                            <td onClick={()=> window.open(`CommChat/${comm.id}/${db.id}`, "_self")}>{comm.communityName}</td> 
                        </button>
                    </tr>
                    </center>
                    
                )}
                </tbody>
            </table>       
        </div>
        </center>      
    )
};

export default Show;