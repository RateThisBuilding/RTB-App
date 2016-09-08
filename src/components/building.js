import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import { MKButton, MKColor, getTheme } from 'react-native-material-kit'

import Styles from '../styles'

const theme = getTheme();
const BuildingImage = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/B-B-and-T-Building-20080321.jpeg';

const ReviewButton = MKButton.flatButton()
  .withText('Add a Review')
  .build();
const RentButton = MKButton.flatButton()
    .withText('Rent Now')
    .build();




export default class Building extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render() {
    return (
      <View style={Styles.buildingComponent}>
        <Image source={{uri: BuildingImage}} style={Styles.buildingImage} />
        <Text>{this.props.building.title}</Text>
        <Text>☆☆☆</Text>
        <View style={{flex:1, flexDirection: 'row',
              justifyContent:'center'}}>
          <ReviewButton style={{width:100, height: 15}}/>
        <RentButton style={{width:70, height: 15}}/>
        </View>
      </View>
    );
  }
}
