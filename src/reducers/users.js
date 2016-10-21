import * as actionTypes from '../actions/actionTypes'

const initialUserReducer = {
  token: null,
  user: null,
  sessionData: null,
}

export default function (state = initialUserReducer, action){
  switch (action.type){
    case actionTypes.ACQUIRE_INITIAL_TOKEN_SUCCESS:
      return { ...state, token: action.data.token }
    case actionTypes.USER_LOGIN_SUCCESS:
      return { ...state, token: action.data.token, user: action.data.user, sessionData: action.data}
    case actionTypes.USER_LOGOUT_SUCCESS:
      return { ...state, token: null, user: null, sessionData: null}
    default:
      return state
  }
}
