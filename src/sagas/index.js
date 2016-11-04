import { fork } from 'redux-saga/effects'
import userSagas from './users'
import reviewsSaga from './reviews'

export default function* root() {
  yield fork(userSagas)
  yield fork(reviewsSaga)
}
