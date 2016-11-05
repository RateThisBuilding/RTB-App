import * as actionTypes from '../actions/actionTypes'

const initialState = {
  globalModal : false,
  error: null
}

export default function (state = initialState, action){
  switch(action.type){
    case actionTypes.OPEN_GLOBAL_MODAL:
      return {...state, globalModal: true, error: null}
    case actionTypes.CLOSE_GLOBAL_MODAL:
      return {...state, globalModal: false}
    case actionTypes.OPEN_ERROR_MODAL:
      return {...state, globalModal: true, error: action.error}
    default:
      return state
  }
}
