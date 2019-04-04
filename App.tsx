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


interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <TodoList />
    );
  }
}
