// import external dependencies
import React, { Component } from 'react';
import {  bindActionCreators,  } from 'redux'
import { connect } from 'react-redux'
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';
import { Text } from 'react-native'

// import scenes
import Styles from './styles'
import Buildings from './scenes/buildings'
// import Messages from './scenes/messages'
import AddBuilding from './scenes/addBuilding'
import Profile from './scenes/profile'
import AddReview from './scenes/addReview'
import BuildingDetails from './scenes/buildingDetails'
import BuildingSearch from './scenes/buildingSearch'
import Auth from './scenes/auth'
import { Tab_HomeIcon, Tab_Search, /* Tab_MessageIcon,*/ Tab_NewListingIcon, Tab_ProfileIcon } from './components/tabicon';
// import all relevent Actions
import { clearSearchParams } from './actions/buildingSearch'

// TODO: Find a solution that doesn't require importing the reducer directly
import { initialState as defaultBuildingParams } from './reducers/buildingSearch'
import _ from 'underscore'







class AppRouter extends Component {

  _updateTitleAfterSearchActive(){
    return this.props.searchActive? 'Clear' : ' '
  }
  componentWillReceiveProps(nextProps){
      this.setState({
        clearLabelVisible: nextProps.searchActive
      })

  }
  constructor(props){
    super(props)
    this.state = {
      clearLabelVisible: false
    }
    this.scenes = Actions.create(
      <Scene key="modal" component={Modal}>
        <Scene key="root" >
          <Scene key="tabbar" tabs={true} style={Styles.tabMenuBarStyles}>
            <Scene
              key="buildingsTab"
              selectedIconStyle={Styles.tabIconSelected}
              initial={true}
              icon={Tab_HomeIcon}
            >
              <Scene
                key="buildings"
                component={Buildings}
                title="Buildings"
                type="refresh"
                rightTitle="Search"
                onRight={()=>Actions.buildingSearch()}
                onLeft= {()=>{this.props.clearSearchParams(); Actions.refresh()}}
                getLeftTitle={this._updateTitleAfterSearchActive.bind(this)}
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
                panHandlers={null}
                icon={Tab_Search}/>

            </Scene>
            {/* <Scene key="messages" selectedIconStyle={Styles.tabIconSelected} hideNavBar={false} component={Messages} title="Messages" icon={Tab_MessageIcon}/> */}

            <Scene
              key="new"
              selectedIconStyle={Styles.tabIconSelected}
              hideNavBar={false}
              component={AddBuilding}
              title="Add Building"
              icon={Tab_NewListingIcon}/>
            <Scene
              key="profileTab"
              selectedIconStyle={Styles.tabIconSelected}
              hideNavBar={false}
              icon={Tab_ProfileIcon}>
              <Scene
                key="profile"
                component={Profile}
                title="Profile"
                type="refresh"
              />
              <Scene
                key="auth"
                component={Auth}
                schema="modal"
                direction="vertical"
                hideTabBar={true}
              />
            </Scene>
          </Scene>
        </Scene>
      </Scene>
    );
  }


  render() {
    return (
      <Router scenes={this.scenes} />
    )
  }
}

function mapStateToProps(state){
  return {
    searchActive: state.buildingSearch.searchActive,
    searchParams: state.buildingSearch.searchParams
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearSearchParams }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
