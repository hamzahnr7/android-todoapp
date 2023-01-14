import { Button, StyleSheet, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Text } from "@react-native-material/core";
import {Picker} from '@react-native-picker/picker';
import { DatePickerInput } from 'react-native-paper-dates';

import axios from 'axios';
import { url } from '../Env';

export default function Todo({route, navigation}) {
  const params = route.params;
  const todoId = route.params.id;
  const dateTime = new Date(params.deadline);

  const [deadline, setInputDate] = useState(params.deadline?  dateTime :'');
  const [title, setTitle] = useState(params.title? params.title :'');
  const [status, setStatus] = useState(params.status? params.status :'');
  const [desc, setDesc] = useState(params.description? params.description :'');
  //const [status, setStatus] = useState(params.status? params.status :'');
  //const [deadline, setDeadline] = useState(params.deadline? params.deadline :'');

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
    console.log(params)
    if (params.title == '' || params.desc == '' || params.status == '' || params.deadline == '') {
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
      
      <Picker
        selectedValue={status}
        onValueChange={(text, itemIndex) => setStatus(text)}
        placeholder='Select Input'
        >
        <Picker.Item label="Select Input" />
        <Picker.Item label="Todo" value="Todo" />
        <Picker.Item label="Ongoing" value="Ongoing" />
        <Picker.Item label="Done" value="Done" />
      </Picker>
      <DatePickerInput
          locale="en"
          label="Deadline"
          value={deadline}
          onChange={(text) => setInputDate(text) }
          inputMode="start"
        />
      {/* <TextInput variant='outlined' label='Input Deadline' onChangeText={(text) => setInputDate(text)} value={deadline}/> */}
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
  textWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  }
})