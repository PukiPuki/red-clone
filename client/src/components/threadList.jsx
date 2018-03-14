import React, { Component } from 'react';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { Flex, Box } from 'reflexbox';
import ThreadBox from './threadBox';


class ThreadList extends Component {
    constructor(props){
        super(props);
        this.state={
            username:''
        }
    }
  render() {
    return (
        <Paper style={{padding: 10 }}>
          <Toolbar>
            <ToolbarGroup>
            <ToolbarTitle text="Threads" />
            <ToolbarSeparator/>
            <RaisedButton label="Create" primary={true} />
            </ToolbarGroup>
          </Toolbar>
          <ThreadBox />
          <ThreadBox />
        </Paper>
    );
  }
}

export default ThreadList;
