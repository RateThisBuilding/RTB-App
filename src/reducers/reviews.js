import * as types from '../actions/actionTypes'

export const initialState = {
  review: null
}

export default function reviews(state = initialState, action = {}){
  switch(action.type){
    case types.ADD_REVIEW_SUCCESS:
      return {...state, review: action.data}
    default:
      return state
  }
}
