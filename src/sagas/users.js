import { call, put, fork, select } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import API from '../api'

function* acquireTokenCall(){
  try{
    yield take(actionTypes.ACQUIRE_INITIAL_TOKEN)
    const response = yield call(API.users.acquireInitialToken)
    yield put({ type: actionTypes.ACQUIRE_INITIAL_TOKEN_SUCCESS, data: response })
  }catch(err){
    yield put({ type: actionTypes.USER_ERROR, error: err })
  }
}

export default function* usersSaga() {
  yield fork(acquireTokenCall)
}
