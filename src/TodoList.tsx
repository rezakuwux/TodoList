import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, Text, View,
    FlatList, TextInput, TouchableOpacity, Alert
} from 'react-native';
import { connect } from 'react-redux';


interface Props {}
class TodoList extends Component<Props, { textTodo: string }> {
    constructor(props: Props) {
        super(props);
    
        this.state = {textTodo: ''};
    }
    
    addTodo = () =>{
        if (this.state.textTodo !== '') {
            
        }
        else{
            Alert.alert(
                '',
                'Todo name can\'t be empty',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
    }
    
    
    render() {
    return (
        <View style={{padding: 10, paddingTop: 80}}>
        <View style={{ flexDirection:'row' }}>
            <TextInput
                style={{flex: 1, height: 40}}
                placeholder="Type here your todo list!"
                onChangeText={(textTodo) => this.setState({textTodo})}
                value={this.state.textTodo}
            />
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={this.addTodo}
            >
            <Text style={{color:'#fff'}}> ADD </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TodoList


const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttons: {
      color : '#841584',
    },
    buttonAdd: {
      alignItems: 'center',
      backgroundColor: '#4286f4',
      padding: 10,
      borderRadius:5,
      justifyContent: 'center'
    },
    buttonEdit: {
      alignItems: 'center',
      backgroundColor: '#4286f4',
      height:30,
      borderRadius:5,
      justifyContent: 'center',
      padding: 5,
    },
    buttonDelete: {
      alignItems: 'center',
      backgroundColor: '#e50000',
      height:30,
      borderRadius:5,
      justifyContent: 'center',
      padding: 5,
    },
    greeting: {
      color: '#999',
      fontWeight: 'bold',
    },
    titleCell: {
      flex:1,
      fontSize: 20,
      color: '#656565'
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd'
    }
});