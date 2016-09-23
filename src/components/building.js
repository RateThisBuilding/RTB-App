import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { MKButton } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'

import { starRendering } from '../renderHelpers'
import Styles, { COLORS } from '../styles'

export default class Building extends Component{
  constructor(props){
    super(props);

  }
  componentWillMount() {
    const building = this.props.building;
    try{
      building.coordinates = JSON.parse(building.coordinates).coordinates
      building.coordinates = {
        latitude : building.coordinates[1],
        longitude : building.coordinates[0]
      }
    }catch(err){
      console.log(`Building ID ${building.id} could not collect cooridnates`);
    }
    // fetch(building.bannerImage)
    //   .then((resp)=>resp.blob())
    //   .then((resp)=>{
    //     console.log(resp);
    //     AsyncStorage.setItem(building.id,resp);
    //   })
    this.setState({
      building: this.props.building
    })

  }
  render() {
    const _building = this.state.building;

    const ReviewButton = MKButton.flatButton()
      .withTextStyle({ color: COLORS.THEME, fontWeight: 'bold', fontSize: 11})
      .withText('Add a Review')
      .withOnPress(() => {
        Actions.review({ building: _building });
      })
      .build();
    const DetailsButton = MKButton.flatButton()
      .withTextStyle({ color: COLORS.SECONDARY, fontWeight: 'bold', fontSize: 11})
      .withText('Details')
      .withOnPress(() => {
        Actions.buildingDetails({ title:_building.title, building: _building});
      })
      .build();

    return (

      <View style={Styles.buildingComponent}>
        <TouchableHighlight
          style={{flex: 1}}
          onPress={() => {
            Actions.buildingDetails({ title:_building.title, building: _building});
          }}
          underlayColor={'lightgray'}
        >
          <View style={Styles.buildingComponentTouchable}>
            <Text
              style={{fontSize:11, fontWeight:'bold', textAlign: 'center'}}
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              {_building.title}
            </Text>
            <Image
              source={{uri: _building.banner.src}}
              style={Styles.buildingThumbnail}
            />
            <View style={{flexDirection: 'row'}}>
              {starRendering(_building.rating)}
            </View>
            <Text numberOfLines={1} ellipsizeMode={'middle'} style={{fontSize:9}}>{_building.address}</Text>
            <View style={Styles.buildingComponentButtons}>
              {/* <ReviewButton style={{height: 15}}/> */}
              <DetailsButton style={{height: 15}}/>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

Building.propTypes = {
  building: React.PropTypes.object
}
