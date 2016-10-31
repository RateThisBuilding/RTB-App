import { take, call, put, fork, select } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import API from '../api'

function* addReviewFlow(){
  while(true){
    try{
      const reviewParams = (yield take(actionTypes.ADD_REVIEW)).data
      const token = yield select(state => state.users.token)
      yield call(API.reviews.addReview, reviewParams, token)

    } catch(err){
      console.error(err);
    }
  }
}

export default function* reviewsSaga() {
  yield fork(addReviewFlow)
}
