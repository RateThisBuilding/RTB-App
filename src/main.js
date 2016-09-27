// import external dependencies
import React, { Component } from 'react';
import { createStore, compose } from 'redux'
import { Provider} from 'react-redux'

// import scenes
// import Styles from './styles'
// import Buildings from './scenes/buildings'
// // import Messages from './scenes/messages'
// import CreateListing from './scenes/createListing'
// import Profile from './scenes/profile'
// import AddReview from './scenes/addReview'
// import BuildingDetails from './scenes/buildingDetails'
// import BuildingSearch from './scenes/buildingSearch'

import AppRouter from './router'


// import all relevent reducers
import reducers from './reducers'

const store = compose()(createStore)(reducers)


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
