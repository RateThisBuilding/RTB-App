import * as types from './actionTypes'

export function applySearchParams(){
  return {
    type: types.APPLY_SEARCH_PARAMETERS
  }
}
export function clearSearchParams() {
  return {
    type: types.CLEAR_SEARCH_PARAMETERS
  }
}
