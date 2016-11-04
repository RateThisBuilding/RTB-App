import * as actionTypes from '../actions/actionTypes'

const initialState = {
  globalModal : false,
}

export default function (state = initialState, action){
  switch(action.type){
    case actionTypes.OPEN_GLOBAL_MODAL:
      return {...state, globalModal: true}
    case actionTypes.CLOSE_GLOBAL_MODAL:
      return {...state, globalModal: false}
    default:
      return state
  }
}
