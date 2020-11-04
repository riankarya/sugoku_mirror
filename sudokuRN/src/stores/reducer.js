import { FETCH_BOARD, CHANGE_BOARD, ADD_LEADERBOARD } from './actionTypes'

const defaultValue = {
  board: [],
  players: []
}
const reducer = (state = defaultValue, action) => {
  switch (action.type) {
    case FETCH_BOARD:
      return {...state, board: action.payload}
    case ADD_LEADERBOARD:
      return {...state, players: [...state.players, action.payload]}
    case CHANGE_BOARD:
      let newBoard = state.board.map((elem, index) => {
        if (index == action.payload.index) {
          return action.payload.newValue
        } else return elem
      })
      return {...state, board: newBoard}
    default:
      return state
  }
}

export default reducer