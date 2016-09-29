import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GiftedListView from 'react-native-gifted-listview'
import _ from 'underscore'

import { applySearchParams, clearSearchParams } from '../actions/buildingSearch'
import Styles, { FULLWIDTH } from '../styles'
import Building from '../components/building'
import * as buildingSearchStrategies from '../helpers/searchStrategies'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Buildings extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: 'Buildings',
      buildingsData: ds,
      forceUpdate: false
    };
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
      console.log('Searching...');
      console.log('Category: ', category);
      console.log('Address: ', address);
      console.log('Location: ', location);
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
      pageSize={6}
      onFetch={this._onFetch.bind(this)}
      pagination={true}
      refreshable={true}
      withSections={true}
      contentContainerStyle={Styles.buildingsListStyle}
      rowView={(rowData)=> <Building building={rowData}/>}
      forceUpdate={this.state.forceUpdate} //This is
      sectionHeaderView={(sectionData, sectionID)=>{
        return (
          <View style={{ backgroundColor: '#50a4ff', padding: 10, width: FULLWIDTH }}>
            <Text style={{ color: '#fff', }}>
              {sectionID}
            </Text>
          </View>
        );
      }}
      refreshableTintColor="blue"
      customStyles={{
        paginationView: {
          width: FULLWIDTH,
          flex: 2,
        },
      }}
      ref={'BUILDINGLIST'}
                     />

    return (
      <View style={[Styles.container, {marginLeft: 0, marginRight: 0}]}>
        {listView}
      </View>
    );
  }
}

Buildings.propTypes = {
  searchParams: React.PropTypes.object,
  searchActive: React.PropTypes.bool
}

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
