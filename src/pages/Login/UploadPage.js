import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';

import {blue500, red500, greenA200} from '@material-ui/core/colors/';
import UploadScreen from './UploadScreen';
import Pastfiles from './Pastfiles';
import LoginScreen from './LoginScreen'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {draweropen: false,currentScreen:[]};
  }
  componentDidMount(){
    var currentScreen=[];
    currentScreen.push(<UploadScreen appContext={this.props.appContext} role={this.props.role}/>);
    this.setState({currentScreen})
  }
  /**
   * Toggle opening and closing of drawer
   * @param {*} event 
   */ 
  toggleDrawer(event){
  // console.log("drawer click");
  this.setState({draweropen: !this.state.draweropen})
  }
  handleMenuClick(event,page){
    switch(page){
      case "openprint":
      // console.log("need to open uploadapge")
      var currentScreen=[];
      currentScreen.push(<UploadScreen appContext={this.props.appContext} role={this.props.role}/>);
      this.setState({currentScreen})
      break;
      case "openpast":
      // console.log("need to open pastfiles")
      var currentScreen=[];
      currentScreen.push(<Pastfiles appContext={this.props.appContext} role={this.props.role}/>);
      this.setState({currentScreen})
      break;
      case "logout":
      var loginPage =[];
      loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
      this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
      break;
    }
    this.setState({draweropen:false})
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="Printing Page"
            onLeftIconButtonTouchTap={(event) => this.toggleDrawer(event)}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer open={this.state.draweropen}>
            <MenuItem>
              <div>
              User Profile
              </div>
            </MenuItem>
              <div>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"openprint")}>
                  Printing Page
              </MenuItem>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"openpast")}>
                  Past Files
              </MenuItem>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"logout")}>
                  Logout
              </MenuItem>
              </div> 
          </Drawer>
        </MuiThemeProvider>
        <div>
          {this.state.currentScreen}
        </div>
      </div>
    );
  }
}

export default App;