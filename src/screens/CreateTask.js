import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { url } from '../Env';

export default function Todo({route, navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');

  const params = route.params;
  
  const createTask = async (params) => {
    const dataTodo = {
      title: params.title,
      description: params.desc,
      status: params.status,
      deadline: params.deadline
    };
    const res = await axios.post(url, dataTodo)
      .then(function (json) {
        console.log(json.response)
      })
    // console.log(dataTodo);
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
        <View style={{width: '30%'}}>
          <Button title={params.buttonText} onPress={() => createTask({title, desc, status, deadline})} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})