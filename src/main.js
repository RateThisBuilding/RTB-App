import React, { Component } from 'react';
import { AppRegistry,
   StatusBar,
   Navigator,
   ListView,
   Text,
   View } from 'react-native';
// import Tabs from 'react-native-tabs';
import NavigationBar from 'react-native-navbar';
import { Scene, Router } from 'react-native-router-flux';

import Styles from './styles'
import Buildings from './components/buildings'
import Messages from './components/messages'
import CreateListing from './components/createListing'
import Profile from './components/profile'
import TabIcon from './components/tabicon';


export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="tabbar" tabs={true}>
            <Scene key="buildings" hideNavBar={false} initial={true} component={Buildings} title="Buildings" icon={TabIcon}/>
            <Scene key="messages" hideNavBar={false} component={Messages} title="Messages" icon={TabIcon}/>
            <Scene key="new" hideNavBar={false} component={CreateListing} title="New" icon={TabIcon}/>
            <Scene key="profile" hideNavBar={false} component={Profile} title="Profile" icon={TabIcon}/>
          </Scene>
        </Scene>
      </Router>
    );
  }
}



// App registration and rendering
