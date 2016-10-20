import * as actionTypes from './actionTypes'

export function acquireInitialToken(){
  return {
    type: actionTypes.ACQUIRE_INITIAL_TOKEN,
  }
}

export function getCurrentToken(){
  return {
    type: actionTypes.GET_CURRENT_TOKEN
  }
}

export function login(username, password){
  return {
    type: actionTypes.USER_LOGIN,
    data: {
      username,
      password
    }
  }
}

export function logout(){
  return {
    type: actionTypes.USER_LOGOUT
  }
}
