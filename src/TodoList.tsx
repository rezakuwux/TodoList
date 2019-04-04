import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, Text, View,
    FlatList, TextInput, TouchableOpacity, Alert,
    Modal,TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import EditItem from './EditItem';

class ListItem extends React.PureComponent {
    _onPressEdit = () => {
        this.props.onEditItem(this.props.item);
    }

    _onPressDelete = () => {
        this.props.onDeleteItem(this.props.item);
    }
  
    render() {
      const item = this.props.item;
      return (
        <View>
            <View style={styles.rowContainer}>
                <Text style={styles.titleCell}
                  numberOfLines={1}>{item.text}</Text>
                <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress={this._onPressEdit}
                >
                <Text style={{color:'#fff'}}> EDIT </Text>
                </TouchableOpacity>
                <View style={{flex:0.04}}/>

                <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={this._onPressDelete}
                >
                <Text style={{color:'#fff'}}> DELETE </Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.separator}/>
          </View>
      );
    }
}

interface Props {}
class TodoList extends Component<Props, { textTodo: string, textEditTodo: string, modalVisible: boolean, editItem: any }> {
    constructor(props: Props) {
        super(props);
    
        this.state = {textTodo: '', textEditTodo: '', modalVisible: false, editItem: null};
    }
    _keyExtractor = (item, index) => index.toString();
    _renderItem = ({item, index}) => (
        <ListItem
          item={item}
          index={index}
          onEditItem={this._onEditItem}
          onDeleteItem={this._onDeleteItem}
        />
    );
    addTodo = () =>{
        if (this.state.textTodo !== '') {
            let params = {
                id        : Math.floor(Math.random() * 100) + 1,
                text      : this.state.textTodo,
              }
            //   this.props.writeText(this.state.text)
              this.props.addTodo(params)
              this.setState({
                textTodo: ''
              })
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
    clearTodo = () => {
        this.props.clearTodo()
    }
    _onDeleteItem = (item: any) => {
        this.props.deleteTodo(item)
    };
    _onEditItem = (item: any) => {
        this.setState(prevState => {
            return {
                modalVisible: true
            }
        });
        this.setState({
            textEditTodo: item.text,
            editItem:item
        })
    };

    cancelEdit = () => {
        this.setState(prevState => {
            return {
                modalVisible: false
            }
          });
    }
    saveEdit = () => {
        let params = {
            id        : this.state.editItem.id,
            text      : this.state.textEditTodo,
          }
        //   this.props.writeText(this.state.text)
          
        this.props.updateTodo(params)
        this.setState(prevState => {
            return {
                modalVisible: false
            }
        });
        this.setState({
            textEditTodo: ''
        })
    }
    render() {
    return (
        <View style={{flex:1, padding: 10, paddingTop: 80, flexDirection:'column'}}>
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
            <FlatList
                data={this.props.listTodo}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
            <TouchableOpacity 
                style={styles.buttonClear}
                onPress={this.clearTodo}>
                <Text style={{color:'#fff'}}> CLEAR </Text>
            </TouchableOpacity>
            <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style = {styles.modal}>
                    <TextInput
                            style={{paddingTop:20,height: 100}}
                            placeholder="Type here your todo list!"
                            onChangeText={(textEditTodo) => this.setState({textEditTodo})}
                            value={this.state.textEditTodo}
                    />
                    <TouchableOpacity
                        style={styles.buttonDelete}
                        onPress={this.cancelEdit}
                    >
                    <Text style={{color:'#fff'}}> CANCEL </Text>
                    </TouchableOpacity>
                    <View style={{flex:0.01}}/>
                    <TouchableOpacity
                        style={styles.buttonEdit}
                        onPress={this.saveEdit}
                    >
                    <Text style={{color:'#fff'}}> SAVE </Text>
                    </TouchableOpacity>
                
               </View>
            </Modal>
        </View>
    );
  }
}

function mapStateToProps(state: { todoList: any; }){
    var listTodo = state.todoList;
  
    return {
        listTodo
    }
}

function mapDispatchToProps(dispatch){
    return {
        addTodo: (value: { id: any; text: any; completed: any; }) => dispatch({ 
            type: "ADD_TODO", 
            payLoad: {
                id        : value.id,
                text      : value.text,
                completed : value.completed
            }
        }),
        updateTodo: (value: { id: any; text: any; }) => dispatch({
            type: "UPDATE_TODO",
            payLoad: {
                id        : value.id,
                text      : value.text
            }
        }),
        clearTodo: () => dispatch({
            type: "CLEAR_DATA"
        }),
        deleteTodo: (value: { id: any; }) => dispatch({
            type: "DELETE_TODO",
            payLoad: {
                id        : value.id
            }
        }),
      
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)


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
    buttonClear: {
        alignItems: 'center',
        backgroundColor: '#e50000',
        padding: 10,
        borderRadius:5,
        justifyContent: 'center',
        bottom:20
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
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100
     },
     modal: {
        flex: 1,
        padding: 20
     },
     text: {
        color: '#3f2949',
        marginTop: 10
     }
});