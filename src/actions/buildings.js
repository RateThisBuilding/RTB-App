import * as actionTypes from './actionTypes'

export function targetBuilding(building){
  return {
    type: actionTypes.TARGET_BUILDING,
    data: building
  }
}
