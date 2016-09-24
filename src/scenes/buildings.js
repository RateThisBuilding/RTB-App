import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import GiftedListView from 'react-native-gifted-listview'
import _ from 'underscore'

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
    // fetch('http://ratethisbuilding.com/api/buildings')
    // .then((response)=> response.json())
    // .then((responseJSON)=> {
    //   self.setState({
    //     buildingsData: self.state.buildingsData.cloneWithRows(
    //       responseJSON.data.filter((obj)=>{return obj.address.length != "0"})
    //     )
    //   });
    // })
    // .catch((err)=>{console.log(err);});
  }

  _onFetch(page = 0, callback, options){
    console.log(page);
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
          rowHasChanged={(r1,r2)=>{
            r1.id !== r2.id
          }}
          distinctRows={(rows)=>{
            var indentitis = {};
            var newRows = [];
            console.log(rows);

            // for(var i = 0;i<rows.length; i++){
            //   if(indentitis[rows[i].id]){
            //     indentitis[rows[i].id]=true;
            //     newRows.push(rows[i]);
            //   }
            // }
            return newRows;
          }}

        />
      </View>
    );
  }
}
