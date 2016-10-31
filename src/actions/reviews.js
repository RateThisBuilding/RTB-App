import * as types from './actionTypes'

export function addReview(params){
  return{
    type: types.ADD_REVIEW,
    data: params
  }
}
