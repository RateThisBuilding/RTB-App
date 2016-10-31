// import external dependencies
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'



import AppRouter from './router'

// import all relevent reducers and sagas
import * as actionTypes from './actions/actionTypes'
import configureStore from './store'


const store = configureStore()


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
