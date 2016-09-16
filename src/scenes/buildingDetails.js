import React, { Component } from 'react';
import { View, ScrollView, Text, Image, MapView } from 'react-native';
import { MKButton, MKColor } from 'react-native-material-kit'
import Ionicons from 'react-native-vector-icons/Ionicons'


import Styles, { COLORS, FULLWIDTH } from '../styles'

const TOP_BUTTON_WIDTH = FULLWIDTH*.45;

// Grabbed from http://stackoverflow.com/questions/30606827/set-the-bounds-of-a-mapview
const earthRadiusInKM = 6371,
      radiusInKM = 1,
      aspectRatio = 1
const radiusInRad = radiusInKM / earthRadiusInKM;

export default class BuildingDetails extends Component {

  deg2rad (angle) {
    return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
  }

  rad2deg (angle) {
    return angle * 57.29577951308232 // angle / Math.PI * 180
  }

  constructor(props){
    super(props);

  }
  componentWillMount() {

  }
  render() {
    const { building } = this.props;


    const buildingRegion = {
      latitude: building.coordinates.latitude,
      longitude: building.coordinates.longitude,
      latitudeDelta: aspectRatio * this.rad2deg(radiusInRad),
      longitudeDelta: this.rad2deg(radiusInRad / Math.cos(this.deg2rad(building.coordinates.latitude)))
    },
      buildingAnnotation = {
        latitude: building.coordinates.latitude,
        longitude: building.coordinates.longitude,
        animateDrop: true,
      }
    console.log(building);
    return (
      <View style={[Styles.container]}>
        <ScrollView>
          <Image
            source={{uri: building.banner.src}}
            style={Styles.buildingBanner}
            />
          <View style={{margin: 15, justifyContent: 'space-around'}}>
            <Text style={{fontSize: 50, fontFamily: 'Helvetica'}}>{building.title}</Text>
            <Text>
              <Ionicons color={COLORS.BLACK} name="md-home" />
              &nbsp;&nbsp;&nbsp;
              {building.address}
            </Text>
            <Text>
              <Ionicons color={COLORS.BLACK} name="md-call" />
              &nbsp;&nbsp;&nbsp;
              {building.phone || "Not Provided"}
            </Text>
            <Text>
              <Ionicons color={COLORS.BLACK} name="md-globe" />
              &nbsp;&nbsp;&nbsp;
              {building.website || "Not Provided"}
            </Text>
            <MapView
              showsUserLocation={true}
              style={{height: 200}}
              region={buildingRegion}
              annotations={[buildingAnnotation]}
              />
          </View>
        </ScrollView>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', margin: 5,
        position: 'absolute', left: 0, top: 0}}>
          <MKButton
            backgroundColor={COLORS.THEME}
            style={Styles.buildingDetailsFloatingButtonStyle}
            onPress={() => {
              console.log('Search Vacancy');
            }}
            >
            <Text style={{color: COLORS.WHITE}}>Search Vacancy...</Text>
          </MKButton>
          <MKButton
            backgroundColor={COLORS.SECONDARY}
            style={Styles.buildingDetailsFloatingButtonStyle}
            onPress={() => {
              console.log('List Now');
            }}
            >
            <Text style={{color: COLORS.WHITE}}>List Now</Text>
          </MKButton>
        </View>

      </View>
    )
  }
}
