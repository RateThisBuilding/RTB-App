import { fork } from 'redux-saga/effects'
import userSagas from './users'

export default function* root() {
  yield fork(userSagas)
}
