import { Button } from '@react-native-material/core';
import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Task = (props) => {
    const updateTask = (params) => {
        console.log(params)
    }
    
    const deleteTask = (params) => {
        console.log(params)
    }

    function StatusComponent(params) {
        return (
            <View style={{borderRadius: 8, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 2}}>
                <Text style={params.color}>{params.status}</Text>
            </View>
        )
    }

    return (
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.textTitle}>{props.title}</Text>
            {
                props.stat == 'Todo' ? <StatusComponent color={styles.textGreen} status={props.stat} /> : 
                    props.stat == 'Ongoing' ? <StatusComponent color={styles.textYellow} status={props.stat} /> :
                    <StatusComponent color={styles.textRed} status={props.stat} />
            }
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => updateTask(props.id)}>
                <Icon name='pencil-box' size={30}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(props.id)}>
                <Icon name='delete-empty' size={30}/>
            </TouchableOpacity>
          </View>
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
});

export default Task;