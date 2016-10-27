import { Actions } from 'react-native-router-flux'
import { take, put, fork } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'


function* modalFlow(){
  while(true){
    try{
      yield take(actionTypes.OPEN_GLOBAL_MODAL)
      yield put({type:actionTypes.OPEN_GLOBAL_MODAL_SUCCESS})
    }catch(err){

    }
  }
}

export default function* uiSaga(){
  yield fork(modalFlow)
}
