/**
 * Simple React Native ToDo App.
 */

import React, {useState} from 'react';
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
  View
} from 'react-native';

import Task from './components/todo';


export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
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
        <View style={styles.items}>
        <Image style={styles.image} source={require('./assets/background.png')}/>
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

      {/* Write new todo */}
      {/* supaya tidak terhalang keyboard */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "android" ? "10" : "10"}
        style={styles.writeTaskWrapper}
      >
      <TextInput style={styles.input} placeholder={'Create New ToDo'} value={task} onChangeText={text => setTask(text)} />
        <Stack fill center spacing={4}>
        <FAB onPress={() => handleAddTask()}
          variant="extended"
          icon={props => <Icon name="pencil" {...props} />}
          label="New ToDo"
          color="primary"
        />
        </Stack>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    flex: 1,
    justifyContent: "center"
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
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
});
