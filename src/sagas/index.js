import { fork } from 'redux-saga/effects'
import userSagas from './users'
import uiSagas from './ui'

export default function* root() {
  yield fork(userSagas)
  yield fork(uiSagas)
}
