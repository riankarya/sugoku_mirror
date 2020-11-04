import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function Finish() {
  const route = useRoute()
  const navigation = useNavigation()
  const { players } = useSelector(state => state)
  console.log(players, 'asup ti finish');
  function time(timer) {
    let menit = Math.floor(timer/60)
    let detik = timer % 60
    return `${menit}m ${detik}s`
  }
  function leaderBoard() {
    return players.map((player, i) => {
    return <View key={i} style={{flex: 0.1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '90%'}}>
      <Text style={{width: '25%', textAlign:'center'}}>{player.name}</Text>
      <Text style={{width: '25%', textAlign:'center'}}>{player.difficulty}</Text>
      <Text style={{width: '25%', textAlign:'center'}}>{time(player.timer)}</Text>
      <Text style={{width: '25%', textAlign:'center'}}>{player.isFinish ? 'Yes' : 'No'}</Text>
    </View>
    })
  }
  return (
    <View style={styles.container}>
      <Text>Ini Finish</Text>
      <Text>Leaderboard</Text>
      <View style={{marginTop: 20, marginBottom: 0, flex: 0.1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '90%'}}>
      <Text style={{width: '25%', textAlign:'center'}}>Name</Text>
      <Text style={{width: '25%', textAlign:'center'}}>Difficulty</Text>
      <Text style={{width: '25%', textAlign:'center'}}>Time</Text>
      <Text style={{width: '25%', textAlign:'center'}}>Finished</Text>
      </View>
      {leaderBoard()}
      <Button title='Go to Home' onPress={ () => navigation.navigate('Home')}></Button>
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