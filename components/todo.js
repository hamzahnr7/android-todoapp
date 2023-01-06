import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';

const Task = (props) => {

    return (
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemText}>{props.text}</Text>
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
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#9B7DEE',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },

});

export default Task;