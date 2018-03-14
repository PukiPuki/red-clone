import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { Flex, Box } from 'reflexbox';

class ThreadBox extends Component {
  constructor(props){
    super(props);
  }

  upVoteHandler = () => {
  }

  downVoteHandler = () => {
  }

  render() {
    return (
      <Paper style={{padding: 2, marginTop:10 }}>
        <Flex p={1} align='center'>
          <Box px={2} w={0/12}>
            {this.props.votes}
          </Box>
          <Box px={2} w={2/12}>
            <FlatButton label="↑" primary={true} />
            <br/>
            <FlatButton label="↓" secondary={true} />
          </Box>
          <Box px={2} w={8/12}>
            {this.props.topic}
            <br/>
            <a style={{fontSize:10}}> {new Date(this.props.date).toString()} </a>
          </Box>
        </Flex>
      </Paper>
    );
  }
}

export default ThreadBox;
