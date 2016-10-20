import * as actionTypes from '../actions/actionTypes'

const initialUserReducer = {
  token: null,
  user: null
}

export default function (state = initialUserReducer, action){
  switch (action.type){
    case actionTypes.ACQUIRE_INITIAL_TOKEN_SUCCESS:
      return { ...state, token: action.data.token }
    default:
      return state
  }
}
