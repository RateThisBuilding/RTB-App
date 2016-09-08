import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, Dimensions } from 'react-native';
import { Scene } from 'react-native-router-flux';


import Styles from '../styles'
import TabIcon from './tabicon'
import Building from './building'

import testData from '../../data/testBuildings'

const fullWidth = Dimensions.get('window').width;
const listStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent:'center'
}

export default class Buildings extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      page: 'Buildings',
      testData: ds.cloneWithRows(testData)
    };
  }
  render() {
  return (
    <View style={Styles.container}>
      <Text> {this.state.page} </Text>
    <ListView
      contentContainerStyle={listStyle}
      dataSource={this.state.testData}
      renderRow={(rowData)=> <Building building={rowData}/>} />



    </View>

  );
}
}
