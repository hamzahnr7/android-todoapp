import {StyleSheet, View, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Text, Button} from '@react-native-material/core';
import {Picker} from '@react-native-picker/picker';
import {DatePickerInput} from 'react-native-paper-dates';

import axios from 'axios';
import {domain} from '../Env';

export default function Todo({route, navigation}) {
  const params = route.params;
  const token = route.params.token;
  const todoId = route.params.id;
  const dateTime = new Date(params.deadline);

  const [deadline, setInputDate] = useState(params.deadline ? dateTime : '');
  const [title, setTitle] = useState(params.title ? params.title : '');
  const [status, setStatus] = useState(params.status ? params.status : '');
  const [desc, setDesc] = useState(
    params.description ? params.description : '',
  );

  const updateTask = async params => {
    const dataTodo = {
      title: params.title,
      description: params.desc,
      status: params.status,
      deadline: params.deadline,
    };
    const res = await axios
      .patch(`${domain}/todo/${params.todoId}`, dataTodo, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (json) {
        navigation.navigate('Dashboard', {token: token});
      });
  };

  const createTask = async params => {
    if (
      params.title == '' ||
      params.desc == '' ||
      params.status == '' ||
      params.deadline == ''
    ) {
      return ToastAndroid.showWithGravity(
        'Please fill all the blank form',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
    const dataTodo = {
      title: params.title,
      description: params.desc,
      status: params.status,
      deadline: params.deadline,
    };
    // console.log(token);
    const res = await axios
      .post(`${domain}/todo`, dataTodo, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (json) {
        navigation.navigate('Dashboard', {token: token});
      });
  };

  return (
    <View>
      <Text variant="h4" style={styles.textWrapper}>
        {params.screenTitle}
      </Text>
      <TextInput
        style={styles.inputWrapper}
        variant="outlined"
        label="Type Title"
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <TextInput
        style={styles.inputWrapper}
        variant="outlined"
        label="Fill Description"
        onChangeText={text => setDesc(text)}
        value={desc}
      />

      <View style={styles.inputWrapper}>
        <Picker selectedValue={status} onValueChange={text => setStatus(text)}>
          <Picker.Item label="Select Input" />
          <Picker.Item label="Todo" value="Todo" />
          <Picker.Item label="Ongoing" value="Ongoing" />
          <Picker.Item label="Done" value="Done" />
        </Picker>
      </View>
      <View style={styles.inputWrapper}>
        <DatePickerInput
          locale="en"
          label="Deadline"
          value={deadline}
          onChange={text => setInputDate(text)}
          inputMode="start"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <Button
            title={'Back'}
            onPress={() => navigation.navigate('Dashboard', {token: token})}
          />
        </View>
        {params.buttonText == 'Save' ? (
          <View style={styles.buttonContainer}>
            <Button
              title={params.buttonText}
              onPress={() =>
                updateTask({title, desc, status, deadline, todoId})
              }
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title={params.buttonText}
              onPress={() => createTask({title, desc, status, deadline})}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
});
