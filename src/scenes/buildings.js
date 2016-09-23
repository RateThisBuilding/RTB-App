import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import GiftedListView from 'react-native-gifted-listview'

import Styles, { FULLWIDTH } from '../styles'
import Building from '../components/building'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Buildings extends Component {


  constructor(props){
    super(props);
    this.state = {
      page: 'Buildings',
      buildingsData: ds
    };
  }

  componentDidMount(){
    const self = this
    // const data = getBuildingsFromAPI();
    fetch('http://ratethisbuilding.com/api/buildings')
    .then((response)=> response.json())
    .then((responseJSON)=> {
      self.setState({
        buildingsData: self.state.buildingsData.cloneWithRows(
          responseJSON.data.filter((obj)=>{return obj.address.length != "0"})
        )
      });
    })
    .catch((err)=>{console.log(err);});
  }

  _onFetch(page = 0, callback, options){
    fetch(`http://ratethisbuilding.com/api/buildings?page=${page - 1}`)
    .then((response)=> response.json())
    .then((responseJSON)=> {
      if(responseJSON.data.length === 0){
        callback([], {allLoaded: true})
      }else{
        callback(responseJSON.data)
      }
    })
    .catch((err)=>{console.log(err);});
  }

  render() {
    return (
      <View style={Styles.container}>
        <GiftedListView
          // initialListSize={6}
          pageSize={6}
          onFetch={this._onFetch}
          pagination={true}
          refreshable={true}
          withSections={false}
          enableEmptySections={true}
          contentContainerStyle={Styles.buildingsListStyle}
          // dataSource={this.state.buildingsData}
          rowView={(rowData)=> <Building building={rowData}/>}
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
