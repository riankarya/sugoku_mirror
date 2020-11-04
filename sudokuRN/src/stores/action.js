import { FETCH_BOARD, CHANGE_BOARD, ADD_LEADERBOARD } from './actionTypes'

export const fetchBoard = (difficulty) => {
  return dispatch => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
    .then(response => response.json())
    .then(data => {
      let tampung = []
      data.board.forEach(elem => {
        elem.forEach(el => {
          tampung.push(el)
        })
      })
      dispatch(
        {
          type: FETCH_BOARD,
          payload: tampung
        }
      )
    })
    .catch(err => {
      console.log(err)
    })
  }
}
export const changeBoard = (newValue, index) => {
  return {
    type: CHANGE_BOARD,
    payload: {newValue, index}
  }
}
export const addLeaderBoard = ({name, timer, isFinish, difficulty}) => {
  return {
    type: ADD_LEADERBOARD,
    payload: {name, timer, isFinish, difficulty}
  }
}