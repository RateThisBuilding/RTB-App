import { take, call, put, fork, select } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import API from '../api'

function* addReviewFlow(){
  while(true){
    try{
      const reviewParams = (yield take(actionTypes.ADD_REVIEW)).data
      yield put({type: actionTypes.OPEN_GLOBAL_MODAL})
      const token = yield select(state => state.users.token)
      const review = yield call(API.reviews.addReview, reviewParams, token)
      yield put({type: actionTypes.ADD_REVIEW_SUCCESS, data: review})
      yield put({type: actionTypes.CLOSE_GLOBAL_MODAL})

    } catch(err){
      console.error(err);
    }
  }
}

export default function* reviewsSaga() {
  yield fork(addReviewFlow)
}
