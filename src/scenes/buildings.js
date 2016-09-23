import React, { Component } from 'react';
import { View, ListView } from 'react-native';

import Styles from '../styles'
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
