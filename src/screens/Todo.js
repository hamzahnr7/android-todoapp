import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function Todo({navigation}) {
  const [title, setTitle] = useState('Title ...');
  const [desc, setDesc] = useState('Description ...');
  const [status, setStatus] = useState('Status ...');
  const [deadline, setDeadline] = useState('Deadline ...');
  
  return (
    <View>
      <Text>Todo</Text>
      <TextInput placeholder={title}/>
      <TextInput placeholder={desc}/>
      <TextInput placeholder={status}/>
      <TextInput placeholder={deadline}/>
      <Button title='Dashboard' onPress={() => navigation.navigate('Dashboard')} />
    </View>
  )
}

const styles = StyleSheet.create({})