import { Button, StyleSheet, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Text } from "@react-native-material/core";
import DatePicker from 'react-native-date-picker'
import axios from 'axios';
import { url } from '../Env';

export default function Todo({route, navigation}) {
  const params = route.params;
  const todoId = route.params.id; 
  const [date, setDate] = useState(new Date())

  const [title, setTitle] = useState(params.title? params.title :'');
  const [desc, setDesc] = useState(params.description? params.description :'');
  const [status, setStatus] = useState(params.status? params.status :'');
  const [deadline, setDeadline] = useState(params.deadline? params.deadline :'');

  const updateTask = async (params) => {
    const dataTodo = {
      title: params.title,
      description: params.desc,
      status: params.status,
      deadline: params.deadline
    };
    const res = await axios.patch(`${url}/${params.todoId}`, dataTodo)
      .then(function (json) {
        navigation.navigate('Dashboard')
      })
  }

  const createTask = async (params) => {
    if (title == '' || desc == '' || status == '' || deadline == '') {
      return ToastAndroid.showWithGravity(
        'Please fill all the blank form',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      )
    }
    const dataTodo = {
      title: params.title,
      description: params.desc,
      status: params.status,
      deadline: params.deadline
    };
    const res = await axios.post(url, dataTodo)
      .then(function (json) {
        navigation.navigate('Dashboard')
      })
  }

  return (
    <View>
      <Text variant="h4" style={styles.textWrapper} >
      Create your new ToDo!
      </Text>
      <TextInput variant='outlined' label='Type Title' onChangeText={(text) => setTitle(text)} value={title}/>
      <TextInput variant='outlined' label='Fill Description' onChangeText={(text) => setDesc(text)} value={desc}/>
      <TextInput variant='outlined' label='Set Status' onChangeText={(text) => setStatus(text)} value={status}/>
      <TextInput variant='outlined' label='Set Deadline' onChangeText={(text) => setDeadline(text)} value={deadline}/>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <View style={{width: '30%'}}>
          <Button title={'Back'} onPress={() => navigation.navigate('Dashboard')}/>
        </View>
        {
          (params.buttonText == 'Save') ?
            <View style={{width: '30%'}}>
              <Button title={params.buttonText} onPress={() => updateTask({title, desc, status, deadline, todoId})} />
            </View>
            :
            <View style={{width: '30%'}}>
              <Button title={params.buttonText} onPress={() => createTask({title, desc, status, deadline})} />
            </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  textWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  }
})