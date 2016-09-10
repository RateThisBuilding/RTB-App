import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import { MKButton, MKColor } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'

import Styles from '../styles'

const BuildingImage = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/B-B-and-T-Building-20080321.jpeg'



export default class Building extends Component{
  constructor(props){
    super(props);

  }
  componentWillMount() {
    this.setState({
      building: this.props.building
    })
  }
  render() {
    const _building = this.state.building;
    const ReviewButton = MKButton.flatButton()
      .withTextStyle({ color: 'teal', fontWeight: 'bold', fontSize: 11})
      .withText('Add a Review')
      .withOnPress(() => {
        Actions.review({ building:_building });
      })
      .build();
    const RentButton = MKButton.flatButton()
      .withTextStyle({ color: 'green', fontWeight: 'bold', fontSize: 11})
      .withText('Rent Now')
      .build();

    return (
      <View style={Styles.buildingComponent}>
        <Text style={{fontSize:11, fontWeight:'bold'}}>{_building.title}</Text>
        <Image source={{uri: BuildingImage}} style={Styles.buildingImage} />
        <Text style={{fontSize:10}}>☆☆☆</Text>
        <Text style={{fontSize:9}}>{_building.address}</Text>
        <View style={Styles.buildingComponentButtons}>
          <ReviewButton style={{height: 15}}/>
          <RentButton style={{height: 15}}/>
        </View>
      </View>
    );
  }
}
