import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { Flex, Box } from 'reflexbox';
import ThreadBox from './threadBox';

import { fetchThreads, createThread } from '../api/threadApi';


class ThreadList extends Component {
  constructor(props){
    super(props);
    this.state={
      threads: [],
      open: false,
    }
  }
  componentDidMount() {
    fetchThreads()
      .then(res => this.setState({
        threads: res.body
      }));
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  };

  topicChangeHandler = (event, newValue) => {
    this.setState({topic:newValue});
  }

  createThreadHandler = () => {
    this.setState({open: false});
    createThread(this.state.topic)
      .then(res => {
        this.setState({threads: res.body});
      });
    this.setState({topic:""});
  }

  render() {
    let threads = this.state.threads;

    let MappedThreads = () => {
      return threads.map(thread => {
        return (
          <ThreadBox
            topic={thread.topic}
            date={thread.date}
            vote={thread.vote}/>
        );
      })
    };

    return (
      <div>
        <Paper style={{padding: 10 }}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Threads" />
              <ToolbarSeparator/>
              <RaisedButton label="Create" primary={true} onClick={this.handleToggle}/>
            </ToolbarGroup>
          </Toolbar>
          <MappedThreads/>
        </Paper>
        <Dialog
          title="Create a new Topic"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleToggle}
          >
          <TextField
            hintText="Enter topic"
            floatingLabelText="Topic"
            fullWidth={true}
            onChange = {this.topicChangeHandler}
            />
          <RaisedButton label="Create" primary={true} onClick={this.createThreadHandler}/>
        </Dialog>
      </div>
    );
  }
}

export default ThreadList;
