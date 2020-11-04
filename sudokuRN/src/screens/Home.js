import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

export default function Home(props) {
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  function onPress() {
    props.navigation.navigate('Game', { name, difficulty })
  }
  function onChangeName(text) {
    setName(text)
  }
  // function onPressDifficulty(level) {
  //   setDifficulty(level)
  // }
  function onPressEasy() {
    setDifficulty('easy')
  }
  function onPressMedium() {
    setDifficulty('medium')
  }
  function onPressHard() {
    setDifficulty('hard')
  }
  return (
    <View style={styles.container}>
      <Text>Ini Home</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15 }}
      onChangeText={text => onChangeName(text)}
      placeholder='input name'
    />
      <View style={{flex: 0.1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '60%'}}>
        <Button style={{margin: 20}} title='Easy' onPress={onPressEasy} color={ difficulty == 'easy' ? '#2196F3' : '#A9A9A9' }></Button>
        <Button style={{margin: 20}} title='Medium' onPress={onPressMedium} color={ difficulty == 'medium' ? '#2196F3' : '#A9A9A9' }></Button>
        <Button style={{margin: 20}} title='Hard' onPress={onPressHard} color={ difficulty == 'hard' ? '#2196F3' : '#A9A9A9' }></Button>
      </View>
      <Button title='Go to Game' onPress={onPress}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})