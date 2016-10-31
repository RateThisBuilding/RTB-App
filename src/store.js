import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()

import reducers from './reducers'
import sagas from './sagas'

export default function configureStore(initialState){
  const store = createStore(reducers, undefined, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ))
  if (module.hot){
    module.hot.accept(() => {
      const nextRootReducer = reducers
      store.replaceReducer(nextRootReducer)
    })
  }
  sagaMiddleware.run(sagas)
  
  return store

}
