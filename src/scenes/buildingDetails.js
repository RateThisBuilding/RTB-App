import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class BuildingDetails extends Component {
  constructor(props){
    super(props);

  }
  render() {
    console.log(this.props.building);
    return (
      <View>
        <Text>BuildingDetails</Text>
      </View>
    )
  }
}
