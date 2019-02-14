import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import LoginScreen from './LoginScreen';

//injectTapEventPlugin();

class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[]
      
    }
  }
  componentWillMount(){
  }
  render() {
    return (
      <div className="App">
      <div><h1>Olar mundo</h1></div>
        <LoginScreen />
      </div>
    );
  }
}

export default Home;