import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Box } from 'reflexbox'
import Login from './components/login';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <Flex p={2} align='center'>
              <Box px={2} w={9/12}>
              </Box>
              <Box px={2} w={3/12}>
                <Login/>
              </Box>
            </Flex>
        </MuiThemeProvider>
    );
  }
}

export default App;
