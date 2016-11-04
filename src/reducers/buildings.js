import * as types from '../actions/actionTypes'

export const initialState = {
  building: null
}

export default function buildings(state = initialState, action = {}){
  switch(action.type){
    case types.TARGET_BUILDING:
      return {
        ...state,
        building: action.data
      }
    default:
      return state
  }
}
