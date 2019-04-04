/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TodoList from './src/TodoList';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxWrapper from 'kuwuxlib';

const store = createStore(ReduxWrapper)

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}
