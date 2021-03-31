import React, { Component } from 'react'

export class SpotifyLogin extends Component{
    static displayName = SpotifyLogin.name;
    constructor(props) {
        super(props);
        this.state = { userData: [], loading: true };
    }

    componentDidMount() {
        this.getUserData();
    }

    static renderUserData(userData) {
        return(
            window.location.href = userData
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SpotifyLogin.renderUserData(this.state.userData);

        return (
            <div>
                <h1 id="tabelLabel">Login with Spotify</h1>
                <button className="btn btn-primary" onClick={() => this.getUserData()}>Login</button>
                {contents}
            </div>
        );
    }

    async getUserData() {
        //API CALL
        const response = await fetch("https://localhost:5002/SpotifyAuthentication");
        const data = await response.json();
        this.setState({ userData: data, loading: false });
    }
}