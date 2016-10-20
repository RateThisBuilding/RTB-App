// import external dependencies
import React, { Component } from 'react';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

import AppRouter from './router'


// import all relevent reducers
import reducers from './reducers'
import sagas from './sagas'

// const store = compose()(createStore)(reducers)
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)))
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
