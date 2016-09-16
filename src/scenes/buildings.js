import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, Dimensions } from 'react-native';
import { Scene } from 'react-native-router-flux';


import Styles from '../styles'
import TabIcon from '../components/tabicon'
import Building from '../components/building'

import testData from '../../data/testBuildings'

const fullWidth = Dimensions.get('window').width;

// async function getBuildingsFromAPI(){
//   let response =  await
//   return response
// }
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
      console.log(responseJSON);
      self.setState({
        buildingsData: self.state.buildingsData.cloneWithRows(responseJSON.data)
      });
    })
    .catch((err)=>{console.log(err);});
  }



  render() {
    return (
      <View style={Styles.container}>
        <ListView
          contentContainerStyle={Styles.buildingsListStyle}
          dataSource={this.state.buildingsData}
          renderRow={(rowData)=> <Building building={rowData}/>} />
      </View>
    );
  }
}
