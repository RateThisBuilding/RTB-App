import React, { Component } from 'react';
// import Tabs from 'react-native-tabs';
import { Scene, Router, Modal } from 'react-native-router-flux';

import Styles from './styles'
import Buildings from './scenes/buildings'
import Messages from './scenes/messages'
import CreateListing from './scenes/createListing'
import Profile from './scenes/profile'
import AddReview from './scenes/addReview'
import BuildingDetails from './scenes/buildingDetails'


import TabIcon, { Tab_HomeIcon, Tab_MessageIcon, Tab_NewListingIcon, Tab_ProfileIcon } from './components/tabicon';



export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" >
          <Scene key="modal" component={Modal}>
            <Scene key="tabbar" tabs={true} style={Styles.tabMenuBarStyles}>
              <Scene key="buildingsTab" selectedIconStyle={Styles.tabIconSelected} initial={true}  icon={Tab_HomeIcon}>
                <Scene key="buildings" component={Buildings} title="Buildings" />
                <Scene key="buildingDetails" component={BuildingDetails} />
                <Scene key="addReview" direction="vertical" schema="modal" component={AddReview} title="Add a Review"/>

              </Scene>
              {/* <Scene key="messages" selectedIconStyle={Styles.tabIconSelected} hideNavBar={false} component={Messages} title="Messages" icon={Tab_MessageIcon}/> */}
              <Scene key="new" selectedIconStyle={Styles.tabIconSelected} hideNavBar={false} component={CreateListing} title="New Listing" icon={Tab_NewListingIcon}/>
              <Scene key="profile" selectedIconStyle={Styles.tabIconSelected} hideNavBar={false} component={Profile} title="Profile" icon={Tab_ProfileIcon}/>
            </Scene>

          </Scene>
        </Scene>
      </Router>
    );
  }
}



// App registration and rendering
