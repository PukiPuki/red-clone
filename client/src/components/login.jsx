import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { Flex, Box } from 'reflexbox'

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:''
        }
    }
  render() {
    return (
        <Paper style={{padding: 10 }}>
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
            fullWidth={true}
            onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
        </Paper>
    );
  }
}

export default Login;
