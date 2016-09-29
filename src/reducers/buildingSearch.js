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
    case types.UPDATE_TEMP_PARAMS:{
      let newParams = _.clone(state.tempParams)
      newParams[action.data.type] = action.data.value
      return {
        ...state,
        tempParams:  newParams
      }
    }
    case types.UPDATE_PARAMS:{
      //executed when OK is clicked in any modal
      return {
        ...state,
        searchParams: state.tempParams,
        // searchActive: false
      }
    }
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
    case types.DISCARD_TEMP_PARAMS:
      return {
        ...state,
        tempParams: state.searchParams
      }
    default:
      return state
  }
}
