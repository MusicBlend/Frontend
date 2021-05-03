import React, { useEffect, useState } from 'react';
//import { useDispatch } from 'react-redux'
import  store  from "../app/store.js";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

const Show = (props) => {
    const [communities, getCommunities] = useState([]);
    
    const db = store.getState();
    useEffect(() => {
        fetch("https://localhost:5001/GetCommunities/" + `${db.id}`)
        .then(results => results.json())
        .then(res =>{
            getCommunities(res);
        })
    })

    return(
        <Router>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Communities</th>
                </tr>
                </thead>
                <tbody>
                {communities.map(comm =>
                    <tr key={comm}>
                        <td><Link to="communities/:comm">{comm}</Link></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        </Router>
    )
};

export default Show;