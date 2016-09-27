import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GiftedListView from 'react-native-gifted-listview'
import _ from 'underscore'

import { applySearchParams, clearSearchParams } from '../actions/buildingList'
import Styles, { FULLWIDTH } from '../styles'
import Building from '../components/building'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Buildings extends Component {


  constructor(props){
    super(props);
    this.state = {
      page: 'Buildings',
      buildingsData: ds
    };
  }

  componentDidMount(){

  }
  componentWillReceiveProps(props) {
    console.log(props);
  }

  _onFetch(page = 0, callback, ){
    fetch(`http://ratethisbuilding.com/api/buildings?page=${page - 1}`)
    .then((response)=> response.json())
    .then((responseJSON)=> {
      if(responseJSON.data.length === 0){
        callback([], {allLoaded: true})
      }else{
        console.log(_.groupBy(responseJSON.data, building => building.location));
        callback(_.groupBy(responseJSON.data, building => building.location))
      }
    })
    .catch((err)=>{console.log(err);});
  }

  render() {
    if(this.props.searchActive){
      return (
        <View></View>
      )
    }
    return (
      <View style={Styles.container}>
        <GiftedListView
          // initialListSize={6}
          pageSize={6}
          onFetch={this._onFetch}
          pagination={true}
          refreshable={true}
          withSections={true}
          // enableEmptySections={true}
          contentContainerStyle={Styles.buildingsListStyle}
          // dataSource={this.state.buildingsData}
          rowView={(rowData)=> <Building building={rowData}/>}
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
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchParams: state.buildingList.searchParams,
    searchActive: state.buildingList.searchActive
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ applySearchParams, clearSearchParams }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Buildings)
