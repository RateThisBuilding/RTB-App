import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import { MKButton, MKColor } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Styles, { COLORS } from '../styles'

const PHOTO_API = 'ratethisbuilding.com/sites/default/files/photos';
const BUILDING_BANNER_FILENAME_OFFSET = 15;

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
    this.setState({
      building: this.props.building
    })


  }
  render() {
    const _building = this.state.building;
    if(_building.title === 'Spectrum 3'){
      console.log(_building);
    }

    const ReviewButton = MKButton.flatButton()
      .withTextStyle({ color: COLORS.THEME, fontWeight: 'bold', fontSize: 11})
      .withText('Add a Review')
      .withOnPress(() => {
        Actions.review({ building:_building });
      })
      .build();
    const RentButton = MKButton.flatButton()
      .withTextStyle({ color: COLORS.SECONDARY, fontWeight: 'bold', fontSize: 11})
      .withText('Details')
      .build();

    return (
      <View style={Styles.buildingComponent}>
        <Text style={{fontSize:11, fontWeight:'bold'}}>{_building.title}</Text>
        <Image
          source={{uri: `http://${PHOTO_API}/${_building.banner.uri.slice(BUILDING_BANNER_FILENAME_OFFSET)}`}}
          style={Styles.buildingImage}
          // resizeMode={'contain'}
          />
        {/* <Text style={{fontSize:10, color: '#000000'}}>{_building.rating}</Text> */}
        <View style={{flexDirection: 'row'}}>
          {starRendering(_building.rating)}
        </View>
        <Text numberOfLines={1} ellipsizeMode={'middle'} style={{fontSize:9}}>{_building.address}</Text>
        <View style={Styles.buildingComponentButtons}>
          {/* <ReviewButton style={{height: 15}}/> */}
          <RentButton style={{height: 15}}/>
        </View>
      </View>
    );
  }
}
