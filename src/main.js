// import external dependencies
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import createSagaMiddleware from 'redux-saga'


const sagaMiddleware = createSagaMiddleware()

import AppRouter from './router'

// import all relevent reducers and sagas
import * as actionTypes from './actions/actionTypes'
import reducers from './reducers'
import sagas from './sagas'



const store = createStore(reducers, undefined, composeWithDevTools(
  applyMiddleware(sagaMiddleware)
))
AsyncStorage.getItem('@RateThisBuilding:session', (err, result)=>{
  // console.log(err);
  console.log(result);
  if(result){
    store.dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      data: JSON.parse(result)
    })
  }
})
sagaMiddleware.run(sagas)

export default class Main extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}



// App registration and rendering
