// import external dependencies
import React, { Component } from 'react';
import {  Text, StyleSheet, TouchableOpacity } from 'react-native'
import {  bindActionCreators,  } from 'redux'
import { connect } from 'react-redux'
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


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
import GlobalModalBox from './scenes/globalModalBox'

import { Tab_HomeIcon, Tab_Search,Tab_NewListingIcon, Tab_ProfileIcon } from './components/tabicon';
// import all relevent Actions
import { clearSearchParams } from './actions/buildingSearch'
import { logout } from './actions/users'
import { openGlobalModal } from './actions/ui'
import { COLORS } from './styles'

// TODO: Find a solution that doesn't require importing the reducer directly

class AppRouter extends Component {

  static propTypes = {
    searchActive: React.PropTypes.bool,
    clearSearchParams: React.PropTypes.func,
    logout: React.PropTypes.func,
    user: React.PropTypes.object
  }

  _updateTitleAfterSearchActive(){
    return this.props.searchActive? 'Clear' : ' '
  }
  _shouldShowLogoutButton(){
    return this.props.user? 'Log out': 'aaa'

  }
  _renderBackButton(nav) {
    return nav.navigationState.index ? (
      <TouchableOpacity onPress={Actions.pop} style={{justifyContent: 'center', alignItems: 'center'}}>
        <MaterialIcons color={'#fff'} name="chevron-left" size={25} />
      </TouchableOpacity>
    ): null
  }
  _titleStyles(route){
    return {
      ellipsizeMode: 'tail'
    }
  }
  _commonSceneProps(){
    return {
      getLeftTitle: this._updateTitleAfterSearchActive.bind(this),
      navigationBarStyle: styles.navigationBarStyle,
      titleStyle: styles.navigationBarTextStyle,
      rightButtonTextStyle: styles.navigationBarTextStyle,
      renderBackButton: this._renderBackButton,
      titleProps: this._titleStyles
    }
  }
  constructor(props){
    super(props)
    this.state = {
      clearLabelVisible: false,
    }
    this.scenes = Actions.create(
      <Scene key="modal" component={Modal}>
        <Scene key="root" >
          <Scene key="tabbar" tabs={true} style={Styles.tabMenuBarStyles} >
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
                // rightTitle="Search"
                // onRight={()=>Actions.buildingSearch()}
                renderRightButton={()=>{
                  return (
                    <TouchableOpacity onPress={Actions.buildingSearch} style={{justifyContent: 'center', alignItems: 'center'}}>
                      <MaterialIcons color={'#fff'} name="search" size={25} />
                    </TouchableOpacity>
                  )
                }}
                onLeft= {()=>{this.props.clearSearchParams(); Actions.refresh()}}
                {...this._commonSceneProps()}
              />
              <Scene
                key="buildingDetails"
                component={BuildingDetails}
                {...this._commonSceneProps()}
              />
              <Scene
                key="addReview"
                direction="vertical"
                schema="modal"
                hideTabBar={true}
                component={AddReview}
                title="Add a Review"
                {...this._commonSceneProps()}
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
                {...this._commonSceneProps()}

              />


            </Scene>
            {/* <Scene key="messages" selectedIconStyle={Styles.tabIconSelected} hideNavBar={false} component={Messages} title="Messages" icon={Tab_MessageIcon}/> */}

            <Scene
              key="new"
              selectedIconStyle={Styles.tabIconSelected}
              hideNavBar={false}
              component={AddBuilding}
              title="Add Building"
              icon={Tab_NewListingIcon}
              {...this._commonSceneProps()}
            />
            <Scene
              key="profileTab"
              selectedIconStyle={Styles.tabIconSelected}
              hideNavBar={false}
              icon={Tab_ProfileIcon}
            >
              <Scene
                key="profile"
                component={Profile}
                title="Profile"
                type="refresh"
                {...this._commonSceneProps()}
              />

            </Scene>
          </Scene>
          <Scene
            key="auth"
            component={Auth}
            schema="modal"
            direction="vertical"
            hideTabBar={true}
            {...this._commonSceneProps()}
          />
        </Scene>
        <Scene
          key="modalbox"
          component={GlobalModalBox}
          hideNavBar
        />
      </Scene>
    );
  }


  render() {
    return (
      <Router {...this.props} scenes={this.scenes} />
    )
  }
}
const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: COLORS.THEME,
  },
  navigationBarTextStyle: {
    fontFamily: 'Roboto',
    color: '#FFF'
  }
})
function mapStateToProps(state){
  return {
    searchActive: state.buildingSearch.searchActive,
    searchParams: state.buildingSearch.searchParams,
    user: state.users.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
     clearSearchParams,
     logout,
     openGlobalModal
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
