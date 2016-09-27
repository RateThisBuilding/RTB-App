import * as types from '../actions/actionTypes'

const initialState = {
  params: {
    category: 1,
    address: "",
    location: 'Downtown - Chinatown'
  }
}

export default function buildingsList(state = initialState, action = {}){
  switch(action.type){
    case types.APPLY_SEARCH_PARAMETERS:
      return {
        ...state,
        params: action.params
      }
    case types.CLEAR_SEARCH_PARAMETERS:
      return {
        ...state,
        params: initialState.params
      }
    default:
      return state
  }
}
