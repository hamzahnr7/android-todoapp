/**
 * Simple React Native ToDo App
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
  View,
  FlatList,
  ToastAndroid
} from 'react-native';
import todoTemp from './todoTemp';
import Task from './components/todo';


export default function App() {
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
      <View style={{ height: 60}}>
        <FlatList
          data={todoTemp}
          keyExtractor={item=>item.name}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
        <View>
          <Text>{item.name}</Text>
        </View>  
  )}
  />

      {/* Write new todo */}
      {/* supaya tidak terhalang keyboard */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "android" ? "10" : "10"}
        style={styles.writeTaskWrapper}
      >
      <TextInput style={styles.input} placeholder={"Create New ToDo"} value={taskNew} onChangeText={(text) => setTask(text)} />
        <Stack fill center spacing={4}> .
        <FAB onPress={() => handleAddTask()}
          variant="extended" 
          icon={props => <Icon name="pencil" {...props} />} 
          label="New ToDo"
          color="primary"
        />
        </Stack>
      </KeyboardAvoidingView>

    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 240,
    height: 240,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
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
