import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GiftedListView from 'react-native-gifted-listview'
import Geocoder from 'react-native-geocoder'
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
      buildingsData: ds,
      forceUpdate: false
    };
  }

  componentDidUpdate(prevProps,prevState){
    if(!this.props.searchActive){
      this.refs.BUILDINGLIST._refresh();
    }
      // if(!props.searchActive){
    //   console.log(this.refs);
    //   this.refs.BUILDINGLIST._refresh();
    // }
  }

  componentWillReceiveProps(props){
    console.log(props);
  }

  _onFetch(searchActive, page = 0, callback, ){
    if(this.props.searchActive){
      console.log('test 1');
      const { category, address, location} = this.props.searchParams
      // const addressSearchString = address===""? "*" : `${coords.lat},${coords.long}`
      if(address === ""){
        console.log(`http://ratethisbuilding.com/api/buildings-search/${category}/*/${location}?page=${page-1}`);
        fetch(`http://ratethisbuilding.com/api/buildings-search/${category}/*/${location}?page=${page-1}`)
        .then(response => response.json())
        .then(responseJSON => {
          if(responseJSON.data.length === 0){
            callback([], {allLoaded: true})
          }else{
            callback(_.groupBy(responseJSON.data, building => building.location))
          }
        })
      }else{
        console.log('test 2');
        Geocoder.geocodeAddress(address).then(res => {
          const coords = res[0].position
          console.log(category, coords, location);
          fetch(`http://ratethisbuilding.com/api/buildings-search/${category}/${coords.lat},${coords.long}/${location}?page=${page-1}`)
          .then(response => response.json())
          .then(responseJSON => {
            if(responseJSON.data.length === 0){
              callback([], {allLoaded: true})
            }else{
              callback(_.groupBy(responseJSON.data, building => building.location))
            }
          })
        })
        .catch((err)=>{console.log(err);});
      }
    }else{
      console.log('test 3');
      fetch(`http://ratethisbuilding.com/api/buildings?page=${page - 1}`)
      .then((response)=> response.json())
      .then((responseJSON)=> {
        if(responseJSON.data.length === 0){
          callback([], {allLoaded: true})
        }else{
          callback(_.groupBy(responseJSON.data, building => building.location))
        }
      })
      .catch((err)=>{console.log(err);});

    }
  }
  render() {
    const listView = <GiftedListView
      // initialListSize={6}
      pageSize={6}
      onFetch={this._onFetch.bind(this,this.props.searchActive)}
      pagination={true}
      refreshable={true}
      withSections={true}
      // enableEmptySections={true}
      contentContainerStyle={Styles.buildingsListStyle}
      // dataSource={this.state.buildingsData}
      rowView={(rowData)=> <Building building={rowData}/>}
      forceUpdate={this.props.searchActive}
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
      <View style={Styles.container}>
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
    searchParams: state.buildingList.searchParams,
    searchActive: state.buildingList.searchActive
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ applySearchParams, clearSearchParams }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Buildings)
