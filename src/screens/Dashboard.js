// import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, FAB } from "@react-native-material/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  Image,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  FlatList,
  ToastAndroid
} from 'react-native';
// import todoTemp from './src/todoTemp';
import Task from '../components/todo';

export default function Dashboard({navigation}) {
    const [taskNew, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
    }

    const upperTitle = () => {
        
    }
    const handleAddTask = () => {
        if (!taskNew.trim()) {
        ToastAndroid.show("Please enter task name", ToastAndroid.SHORT);
        return;
        } 
        Keyboard.dismiss();
        setTaskItems([...taskItems, taskNew])
        setTask('');
    }
  
  return (
    <View style={styles.container}>
        {/* longer list*/}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <Image style={styles.image} source={require('../assets/background.png')}/>
          <View style={styles.items}>
            {/* task go */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                    <Task text={item} /> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
        </ScrollView>
        <View style={{ height: 60}}>
        {/* Write new todo */}
        {/* supaya tidak terhalang keyboard */}
          <KeyboardAvoidingView 
            // behavior={Platform.OS === "android" ? "10" : "10"}
            style={styles.writeTaskWrapper}
          >
            {/* <TextInput style={styles.input} placeholder={"Create New ToDo"} value={taskNew} onChangeText={(text) => setTask(text)} /> */}
            <View style={{width: 160, justifyContent: 'center'}}>
              <FAB onPress={() => navigation.navigate('Todo')}
                variant="extended" 
                icon={props => <Icon name="pencil" size={20} color='white'/>} 
                label="New ToDo"
                color="primary"
                size='default'
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        {/* <FlatList
            data={todoTemp}
            keyExtractor={item=>item.name}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                <Text>{item.name}</Text>
              </View>)}
          /> */}
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      image: {
        alignSelf: 'center',
        width: 240,
        height: 240,
      },
      tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
        alignItems: "center",
        flex: 1,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
      },
      items: {
        width: '100%',
        marginTop: 30,
      },
      writeTaskWrapper: {
        bottom: 30,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      input: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 200,
      },
      addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
      },
})