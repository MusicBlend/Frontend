import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <center>
        <div>
          <h1>Welcome to MusicBlend!</h1>
          <h2>Log in to start, create or join a community</h2>
          <h2>or chat in the chat tab</h2>
        </div>
      </center>
      
    );
  }
}