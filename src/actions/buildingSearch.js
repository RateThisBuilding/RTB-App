import * as types from './actionTypes'

export function updateTempParams(type, value){
  return {
    type: types.UPDATE_TEMP_PARAMS,
    data: {
      type,
      value
    }
  }
}

export function updateParams(){
  return {
    type: types.UPDATE_PARAMS
  }
}

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

export function discardTempParams() {
  return {
    type: types.DISCARD_TEMP_PARAMS
  }
}
