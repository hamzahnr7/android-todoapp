// import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react';
import {Stack, FAB, Divider} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  TextInput,
  useColorScheme,
  FlatList,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Task from '../components/todoComponent';
import axios from 'axios';
import {url} from '../Env';

export default function Dashboard({navigation}) {
  const [taskItems, setTaskItems] = useState([]);
  const [filter, setFilter] = useState('All');

  const updateTask = async id => {
    const response = await axios
      .get(`${url}/${id}`)
      .then(function (json) {
        const data = json.data;
        navigation.navigate('Todo', {
          buttonText: 'Save',
          screenTitle: 'Task Details',
          ...data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTodo = () => {
    axios
      .get(url)
      .then(function (json) {
        setTaskItems(json.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getTodo();
  }, [taskItems]); // var taskItems

  return (
    <View style={styles.container}>
      {/* longer list*/}
      <View
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>TASK LIST</Text>
          <View style={styles.items}>
            {/* task go */}
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setFilter('All')}>
                <Text style={styles.textFilter}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterButtonBlue}
                onPress={() => setFilter('Todo')}>
                <Text style={styles.textFilterColor}>Todo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterButtonYellow}
                onPress={() => setFilter('Ongoing')}>
                <Text style={styles.textFilterColor}>Ongoing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterButtonGreen}
                onPress={() => setFilter('Done')}>
                <Text style={styles.textFilterColor}>Done</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{height: '80%'}}
              showsVerticalScrollIndicator={false}>
              {taskItems.map((data, idx) => {
                if (filter == 'All') {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => updateTask(data.id)}>
                      <Task
                        title={data.title}
                        stat={data.status}
                        id={data.id}
                        date={data.deadline}
                      />
                    </TouchableOpacity>
                  );
                } else if (data.status == filter) {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => updateTask(data.id)}>
                      <Task
                        title={data.title}
                        stat={data.status}
                        id={data.id}
                        date={data.deadline}
                      />
                    </TouchableOpacity>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={{height: 60}}>
        {/* Write new todo */}
        {/* supaya tidak terhalang keyboard */}
        <KeyboardAvoidingView
          // eslint-disable-next-line no-undef
          behavior={Platform.OS === 'android' ? '10' : '10'}
          style={styles.writeTaskWrapper}>
          <View style={{width: 160, justifyContent: 'center'}}>
            <FAB
              onPress={() =>
                navigation.navigate('Todo', {
                  screenTitle: 'Create your new Task!',
                  buttonText: 'Create Task',
                })
              }
              variant="extended"
              icon={props => <Icon name="pencil" size={20} color="white" />}
              label="CREATE TASK"
              color="primary"
              size="mini"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    width: 240,
    height: 240,
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    width: '100%',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginVertical: 10,
    // borderTopWidth: 5,
    // borderTopColor: 'gray',
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filterButtonBlue: {
    backgroundColor: '#1F79A3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filterButtonYellow: {
    backgroundColor: '#988B34',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filterButtonGreen: {
    backgroundColor: '#5A9834',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textFilter: {
    fontWeight: '500',
  },
  textFilterColor: {
    fontWeight: '500',
    color: 'white',
  },
});
