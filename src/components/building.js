import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native'
import { MKButton, MKColor } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Styles, { COLORS } from '../styles'

const PHOTO_API = 'ratethisbuilding.com/sites/default/files/photos';
const BUILDING_BANNER_FILENAME_OFFSET = 16;

function starRendering(rating = 0){
  const starsJSX = [];
  const stars = Math.floor(parseInt(rating)/10)/2;
  const fullStars = Math.floor(stars);
  for (let i = 0; i < fullStars; i++) {
    starsJSX.push(<FontAwesome key={i} size={10} color={COLORS.BLACK} name={'star'} />);
  }
  if (stars - fullStars == 0.5){
    starsJSX.push(<FontAwesome key={starsJSX.length} size={10} color={COLORS.BLACK} name={'star-half-o'} />)
  }
  for (let i = starsJSX.length; i < 5; i++ ){
    starsJSX.push(<FontAwesome key={i} size={10} color={COLORS.BLACK} name={'star-o'} />)
  }
  return starsJSX;
}

export default class Building extends Component{
  constructor(props){
    super(props);

  }
  componentWillMount() {
    const building = this.props.building;
    console.log(building);
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
        <Text style={{fontSize:11, fontWeight:'bold'}}>{_building.title}</Text>
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
    );
  }
}
