import { Button } from '@react-native-material/core';
import axios from 'axios';
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Modal,
    Pressable
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { url } from '../Env';


const Task = (props, navigation) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [Idx, setIdx] = useState(0);

    const deleteTask = async (params) => {
      const response = await axios.delete(`${url}/${props.id}`)
        .then(function (json) {
          // console.log(`Deleted id ${params}`)
          setDeleteModal(!deleteModal)
        }).catch(function (error) {
          console.log(error)
        })
    }

    function StatusComponent(params) {
        return (
            <View style={{borderRadius: 8, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 2}}>
                <Text style={params.color}>{params.status}</Text>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <Text style={styles.textTitle}>{props.title}</Text>
                    {
                        props.stat == 'Todo' ? <StatusComponent color={styles.textBlue} status={props.stat} /> : 
                          props.stat == 'Ongoing' ? <StatusComponent color={styles.textYellow} status={props.stat} /> :
                            props.stat == 'Done'? <StatusComponent color={styles.textGreen} status={props.stat} /> : 
                              <StatusComponent color={styles.textGreen} status={props.stat} />
                    }
                </View>
                <TouchableOpacity onPress={() => setDeleteModal(!deleteModal)}>
                    <Icon name='delete-empty' size={30}/>
                </TouchableOpacity>
                {/* <View style={{flexDirection: 'row', flex: 1}}>
                    <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => updateTask(props.id)}>
                        <Icon name='pencil-box' size={30}/>
                    </TouchableOpacity>
                </View> */}
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
              <TouchableOpacity style={{flex: 1}} onPress={() => setDeleteModal(!deleteModal)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Sure to delete task?</Text>
                      <Pressable style={[styles.button, styles.buttonClose]} 
                          onPress={() => deleteTask(props.id)}>
                          <Text style={styles.textStyle}>Yes</Text>
                      </Pressable>
                    </View>
                </View>
              </TouchableOpacity>
            </Modal>
        </View>
        
      )
    }
    

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#E8DEF8',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 3,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        // borderWidth: 1
    },
    // Text Style
    itemText: {
        maxWidth: '80%',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textGreen: {
        color: '#5A9834'
    },
    textYellow: {
        color: '#988B34'
    },
    textRed: {
        color: '#983434'
    },
    textBlue: {
        color: '#1F79A3'
    },
    // DeleteModal Style
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // elevation: 5
      },
      button: {
        borderRadius: 10,
        padding: 10,
        // elevation: 2,
        marginVertical: 5
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default Task;