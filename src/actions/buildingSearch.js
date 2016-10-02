import * as types from './actionTypes'


export function applySearchParams(searchParams){
  return {
    type: types.APPLY_SEARCH_PARAMETERS,
    data: searchParams
  }
}
export function clearSearchParams() {
  return {
    type: types.CLEAR_SEARCH_PARAMETERS
  }
}
