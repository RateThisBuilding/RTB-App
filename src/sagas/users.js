import { AsyncStorage } from 'react-native'
import { take, call, put, fork } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import API from '../api'

function* acquireTokenCall(){
  const token_resp = yield call(API.users.acquireInitialToken)
  return token_resp.token
}

function* loginFlow(){
  while (true){
    try{
      const { username, password } = (yield take(actionTypes.USER_LOGIN)).data

      // Open waiting dialog
      yield put({type: actionTypes.OPEN_GLOBAL_MODAL})

      const token = yield call(acquireTokenCall)
      const response = yield call(API.users.login,username, password, token)
      AsyncStorage.setItem('@RateThisBuilding:session', JSON.stringify(response))

      yield put({type: actionTypes.USER_LOGIN_SUCCESS, data: response})
      yield put({type: actionTypes.CLOSE_GLOBAL_MODAL})

    }catch(error){
      console.error(error)
    }


  }
}

function* logoutFlow(){
  while (true) {
    yield take(actionTypes.USER_LOGOUT)
    yield put({type: actionTypes.OPEN_GLOBAL_MODAL})

    const token = yield call(acquireTokenCall)
    const response = yield call(API.users.logout, token)
    AsyncStorage.removeItem('@RateThisBuilding:session')
    yield put({type: actionTypes.USER_LOGOUT_SUCCESS})
    yield put({type: actionTypes.CLOSE_GLOBAL_MODAL})
    

  }
}

export default function* usersSaga() {
  yield fork(loginFlow)
  yield fork(logoutFlow)

}
