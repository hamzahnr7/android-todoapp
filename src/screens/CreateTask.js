import { Button, StyleSheet, Text, TextInput, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { url } from '../Env';

export default function Todo({route, navigation}) {
  const params = route.params;
  const todoId = route.params.id; 

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
        // console.log(json.response)
        navigation.navigate('Dashboard')
      })
  }

  const createTask = async (params) => {
    if (title == '' || desc == '' || status == '' || deadline == '') {
      return ToastAndroid.showWithGravity(
        'All Your Base Are Belong To Us',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    }
    const dataTodo = {
      title: params.title,
      description: params.desc,
      status: params.status,
      deadline: params.deadline
    };
    console.log(url)
    const res = await axios.post(url, dataTodo)
      .then(function (json) {
        navigation.navigate('Dashboard')
      })
  }

  return (
    <View>
      <Text>Todo Details</Text>
      <TextInput placeholder={'Type Title'} onChangeText={(text) => setTitle(text)} value={title}/>
      <TextInput placeholder={'Fill Description'} onChangeText={(text) => setDesc(text)} value={desc}/>
      <TextInput placeholder={'Set Status'} onChangeText={(text) => setStatus(text)} value={status}/>
      <TextInput placeholder={'Set Deadline'} onChangeText={(text) => setDeadline(text)} value={deadline}/>
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

const styles = StyleSheet.create({})