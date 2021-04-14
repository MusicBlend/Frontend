import React, { Component } from 'react';
import queryString from 'query-string'

export class SpotifyResponse extends Component {
    static displayName = SpotifyResponse.name;
    
    constructor(props) {
        super(props);
        this.state = { responseData: [], loading: true };
        this.state = { userData: [], loading: false};
    }

    componentDidMount() {
        this.getUserData();
        this.getCurrentUser();
    }

    static renderUserData(response) {
        
        return (
            <div>
                <h2>{response}</h2>
            </div>
        );
    }
    static renderData(response) {

        return (
            <div>
                <h2>{response.id}</h2>
            </div>
        );
    }
    
    
    render () {
        let accessToken = queryString.parse(this.props.location.search)
        let token = accessToken.code
        
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SpotifyResponse.renderUserData(this.state.responseData);
            
        let userContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SpotifyResponse.renderData(this.state.userData);
            
        
        return (
            <div>
                <h1 id="tabelLabel" >Response Code</h1>
                {<div>{token}</div>}
                {contents}
                <button onClick={() => this.getUserData(token)}>Try Acces Token</button>
                <button onClick={() => this.getCurrentUser(this.state.responseData)}>Get Data</button>
                {userContents}
            </div>
        );
    }

    async getUserData(token) {
        //API CALL
        const response = await fetch("https://localhost:5002/SpotifyAuthentication/" + token);
        const data = await response.json();
        this.setState({ responseData: data, loading: false });
    }
    
    async getCurrentUser(authtoken){
        //API CALL
        const response = await fetch("https://localhost:5002/SpotifyAuthentication/v1/" + authtoken);
        const data = await response.json();
        this.setState({ responseData: data, loading: false});
    }
    
}