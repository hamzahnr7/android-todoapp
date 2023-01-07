import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Todo({navigation}) {
  return (
    <View>
      <Text>Todo</Text>
      <Button title='Dashboard' onPress={() => navigation.navigate('Dashboard')} />
    </View>
  )
}

const styles = StyleSheet.create({})