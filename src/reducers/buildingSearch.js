import _ from 'underscore'
import * as types from '../actions/actionTypes'

export const initialState = {
  searchParams: {
    category: "*",
    address: "",
    location: "*",
  },
  tempParams: {
    category: "*",
    address: "",
    location: "*"
  },
  searchActive: false,
}

export default function buildingSearch(state = initialState, action = {}){
  switch(action.type){
    case types.APPLY_SEARCH_PARAMETERS:
      return {
        ...state,
        searchActive: true,
        searchParams: action.data
      }
    case types.CLEAR_SEARCH_PARAMETERS:
      return {
        ...state,
        searchParams: initialState.searchParams,
        searchActive: false
      }
    default:
      return state
  }
}
