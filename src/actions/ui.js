import * as types from './actionTypes'

export function openGlobalModal() {
  return{
    type: types.OPEN_GLOBAL_MODAL
  }
}

export function closeGlobalModal(){
  return {
    type: types.CLOSE_GLOBAL_MODAL
  }
}
