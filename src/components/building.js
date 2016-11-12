import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Animated, StyleSheet } from 'react-native'
import { MKButton } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'

import { starRendering } from '../renderHelpers'
import Styles, { COLORS, FULLWIDTH, FULLHEIGHT } from '../styles'

export default class Building extends Component{
  constructor(props){
    super(props);
    this.state = {
       fadeAnim: new Animated.Value(0), // init opacity 0
     };
  }
  componentDidMount() {
     Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 1}            // Configuration
     ).start();                // Don't forget start!
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
      console.error(`Building ID ${building.id} could not collect cooridnates`);
    }
    this.setState({
      building: this.props.building
    })

  }
  render() {
    const _building = this.state.building;

    const ReviewButton = MKButton.flatButton()
      .withTextStyle([{ color: COLORS.THEME, fontWeight: 'bold', fontSize: 11},Styles.appFontFamily])
      .withText('Add a Review')
      .withOnPress(() => {
        Actions.review({ building: _building });
      })
      .build();
    const DetailsButton = MKButton.flatButton()
      .withTextStyle([{ color: COLORS.SECONDARY, fontWeight: 'bold', fontSize: 11}, Styles.appFontFamily])
      .withText('DETAILS')
      .withOnPress(() => {
        Actions.buildingDetails({ title:_building.title, building: _building});
      })
      .build();

      console.log(_building);
    return (
      <Animated.View style={[styles.buildingComponentWrapper,{opacity: this.state.fadeAnim}]}>
        <TouchableHighlight
          onPress={() => {
            Actions.buildingDetails({ title:_building.title, building: _building});
          }}
          style={{flex: 1}}
          underlayColor={'lightgray'}
        >
          <View style={styles.buildingComponentTouchable}>
            <View style={{
              flex: 3,
              alignSelf: 'stretch',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
              <Image
                source={{uri: _building.banner.src}}
                style={styles.buildingThumbnail}
                resizeMode="cover"
              />

            </View>
            <View style={{ flex: 1, alignItems: 'center'}}>
              <Text
                style={[Styles.appFontFamily, { fontSize:16, textAlign: 'center', color: 'black'}]}
                numberOfLines={1}>
                {_building.title}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {starRendering(_building.rating)}
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[Styles.appFontFamily,{fontSize:9}]}
              >
                {_building.address}
              </Text>
            </View>
            <View style={styles.buildingComponentButtons}>
              <DetailsButton/>
            </View>
          </View>
        </TouchableHighlight>

      </Animated.View>
          );
  }
}

Building.propTypes = {
  building: React.PropTypes.object
}

const styles = StyleSheet.create({
  buildingComponentWrapper: {
    width: (FULLWIDTH*.5)-10,
    height: FULLHEIGHT*.35,
    margin: 5,
    alignItems: 'stretch',
    // Material card styling
    borderRadius: 2,
    // borderWidth: 1,
    elevation: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 2,
      width: -1
    },
    // shadowColor: '#000000'
  },
  buildingComponentTouchable: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  buildingThumbnail: {
    // flex:1,
    // width:null,
    // height:FULLHEIGHT*.20,
    // alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buildingComponentButtons: {
    margin: 5,
    height: 10,
    flex:0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
})
