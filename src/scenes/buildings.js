import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, NetInfo, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import GiftedListView from 'react-native-gifted-listview'
import _ from 'underscore'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import SceneContainer from '../components/sceneContainer'
import Building from '../components/building'
import { applySearchParams, clearSearchParams } from '../actions/buildingSearch'
import Styles, { FULLWIDTH, FULLHEIGHT, COLORS } from '../styles'
import * as buildingSearchStrategies from '../helpers/searchStrategies'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Buildings extends Component {

  static propTypes = {
    searchParams: React.PropTypes.object,
    searchActive: React.PropTypes.bool
  }
  static renderRightButton(nav){
    return nav.navigationState.index ? (
      <TouchableOpacity onPress={Actions.pop} style={{justifyContent: 'center', alignItems: 'center'}}>
        <MaterialIcons color={'#fff'} name="chevron-left" size={25} />
      </TouchableOpacity>
    ): null
  }

  constructor(props){
    super(props);
    this.state = {
      page: 'Buildings',
      buildingsData: ds,
      forceUpdate: false
    };
  }

  componentDidMount(){
    // Need to preload modalbox in this scene since it will be first to load
    Actions.modalbox();
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });
  }

  componentWillReceiveProps(nextProps){
    const shouldUpdate = !_.isEqual(nextProps.searchParams, this.props.searchParams)
    this.setState({
      forceUpdate: shouldUpdate
    })

  }

  _onFetch(page = 0, callback, ){
    if(this.props.searchActive){
      const { category, address, location} = this.props.searchParams
      // const addressSearchString = address===""? "*" : `${coords.lat},${coords.long}`
      if(address === ""){
        buildingSearchStrategies.searchWithoutAddress(category, location, page, callback)
      }else{
        buildingSearchStrategies.search(category, address, location, page, callback)
      }
    }else{
        buildingSearchStrategies.standard(page, callback)
    }
  }
  render() {
    const listView = <GiftedListView
      // pageSize={6}
      onFetch={this._onFetch.bind(this)}
      pagination={true}
      refreshable={true}
      withSections={true}
      autoPaginate={true}
      // style={{ height: FULLHEIGHT-50-64}}
      contentContainerStyle={Styles.buildingsListStyle}
      rowView={(rowData)=> <Building building={rowData}/>}
      forceUpdate={this.state.forceUpdate} //This is
      sectionHeaderView={(sectionData, sectionID)=>{
        return (
          <View style={{ backgroundColor: COLORS.SECONDARY, padding: 10, width: FULLWIDTH }}>
            <Text style={{ color: '#fff', }}>
              {sectionID}
            </Text>
          </View>
        );
      }}
      paginationWaitingView={()=>{
        return (<View></View>)
      }}
      refreshableTintColor="blue"
      customStyles={{
        paginationView: {
          width: FULLWIDTH,

        },
      }}
      ref={'BUILDINGLIST'}
                     />

    return (
      <SceneContainer>
        {listView}
      </SceneContainer>
    );
  }
}


const styles = StyleSheet.create({

})

function mapStateToProps(state) {
  return {
    searchParams: state.buildingSearch.searchParams,
    searchActive: state.buildingSearch.searchActive
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ applySearchParams, clearSearchParams }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Buildings)
