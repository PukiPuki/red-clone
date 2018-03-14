import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { Flex, Box } from 'reflexbox';

class ThreadBox extends Component {
    constructor(props){
        super(props);
        this.state={
            username:''
        }
    }
  render() {
    return (
        <Paper style={{padding: 2, marginTop:10 }}>
            <Flex p={1} align='center'>
              <Box px={2} w={2/12}>
                <FlatButton label="↑" primary={true} />
                <FlatButton label="↓" secondary={true} />
              </Box>
              <Box px={2} w={10/12}>
                Right
              </Box>
            </Flex>
        </Paper>
    );
  }
}

export default ThreadBox;
