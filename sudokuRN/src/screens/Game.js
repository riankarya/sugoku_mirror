import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { fetchBoard, changeBoard, addLeaderBoard } from '../stores/action'
import { useSelector, useDispatch } from 'react-redux'
import CountDown from 'react-native-countdown-component'

export default function Game(props) {
  const { name, difficulty } = props.route.params
  const dispatch = useDispatch()
  const board = useSelector(state => state.board)
  const navigation = useNavigation()
  const [timer, setTimer] = useState(0)
  const coloredBackground = [1,2,3,7,8,9,10,11,12,16,17,18,19,20,21,25,26,27,31,32,33,40,41,42,49,50,51,55,56,57,61,62,63,64,65,66,70,71,72,73,74,75,79,80,81]

  function onPressToHome() {
    navigation.navigate('Home')
  }
  function finishState(isWin) {
    if (isWin) {
      dispatch(addLeaderBoard({name, timer, isFinish: true, difficulty}))
    } else {
      dispatch(addLeaderBoard({name, timer: 1200, isFinish: false, difficulty}))
    }
  }
  async function onPressToFinish() {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&')
    const newBoard = []
    const tempBoard = JSON.parse(JSON.stringify(board))
    while(tempBoard.length) newBoard.push(tempBoard.splice(0, 9))
    console.log(newBoard, newBoard.length, 'asup ti tempboard');
    const data = {board: newBoard}
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status == 'solved') {
          finishState(true)
          navigation.replace('Finish')
        } else {
          alert('Wrong Solution')
        }
      })
      .catch(console.warn)
  }
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
    dispatch(fetchBoard(difficulty))
    return () => clearInterval(interval)
  }, [])
  function renderBoard() {
     return board.map((elem, i) => {
      let bgGrey = coloredBackground.includes(i+1)
      return <View key={i} style={{...styles.square, margin: 1, backgroundColor: bgGrey ? 'grey' : 'white'}}>
      <TextInput
      style={{ height: 30, borderColor: 'gray', borderWidth: 1, paddingLeft: 10 }}
      onChangeText={text => onChangeText(text, i)}
      defaultValue={elem + ''}
      keyboardType={"number-pad"}
    />
      </View> 
    })
  }
  function onChangeText(text, i) {
    dispatch(changeBoard(Number(text), i))
  }
  return (
    <View style={styles.container}>
      <Text>Halo { name }</Text>
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: 290}}>
      {renderBoard()}
      <KeyboardAvoidingView keyboardVerticalOffset={-170}>
        <View style={{marginTop: 20, marginLeft: '35%', justifyContent: 'center'}}>
          <Button title='Go to Home' onPress={ onPressToHome }></Button>
          <Button title='Finish' onPress={ onPressToFinish }></Button>
        </View>
      </KeyboardAvoidingView>
      <Text style={{width: '93%', textAlign: 'center'}}>Time Remaining</Text>
      <CountDown
        until={60 * 20}
        size={20}
        onFinish={() => {
          alert("Time's Up")
          finishState(false)
          navigation.replace('Finish')
        }}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        style={{width: '93%', textAlign: 'center'}}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  square: {
    width: 30,
    height: 30
  },
  container: {
    flex: 0.9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})