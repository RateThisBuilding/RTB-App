import React, { Component } from 'react';
// import Tabs from 'react-native-tabs';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';

import Styles from './styles'
import Buildings from './scenes/buildings'
// import Messages from './scenes/messages'
import CreateListing from './scenes/createListing'
import Profile from './scenes/profile'
import AddReview from './scenes/addReview'
import BuildingDetails from './scenes/buildingDetails'
import BuildingSearch from './scenes/buildingSearch'

const RouterWithRedux = connect()(Router)
import reducers from './reducers'


import { Tab_HomeIcon, Tab_Search, /* Tab_MessageIcon,*/ Tab_NewListingIcon, Tab_ProfileIcon } from './components/tabicon';


const store = compose()(createStore)(reducers)


export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="modal" component={Modal}>
            <Scene key="root" >
              <Scene key="tabbar" tabs={true} style={Styles.tabMenuBarStyles}>
                <Scene key="buildingsTab" selectedIconStyle={Styles.tabIconSelected} initial={true}  icon={Tab_HomeIcon}>
                  <Scene
                    key="buildings"
                    component={Buildings}
                    title="Buildings"
                    type="refresh"
                    rightTitle="Search"
                    onRight={()=>Actions.buildingSearch()}
                    onLeft={()=>Actions.buildings({refresh: {searchParams: {abc:1}} })}
                    leftTitle="Clear"
                  />
                  <Scene
                    key="buildingDetails"
                    component={BuildingDetails}
                  />
                  <Scene
                    key="addReview"
                    direction="vertical"
                    schema="modal"
                    hideTabBar={true}
                    component={AddReview}
                    title="Add a Review"
                  />
                  <Scene
                    key="buildingSearch"
                    // selectedIconStyle={Styles.tabIconSelected}
                    schema="modal"
                    direction="vertical"
                    hideNavBar={false}
                    component={BuildingSearch}
                    title="Search for building"
                    icon={Tab_Search}/>

                </Scene>
                {/* <Scene key="messages" selectedIconStyle={Styles.tabIconSelected} hideNavBar={false} component={Messages} title="Messages" icon={Tab_MessageIcon}/> */}

                <Scene
                  key="new"
                  selectedIconStyle={Styles.tabIconSelected}
                  hideNavBar={false}
                  component={CreateListing}
                  title="New Listing"
                  icon={Tab_NewListingIcon}/>
                <Scene
                  key="profile"
                  selectedIconStyle={Styles.tabIconSelected}
                  hideNavBar={false}
                  component={Profile}
                  title="Profile"
                  icon={Tab_ProfileIcon}/>
              </Scene>

            </Scene>
          </Scene>
        </RouterWithRedux>

      </Provider>
    );
  }
}



// App registration and rendering
