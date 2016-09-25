import React, { Component } from 'react';
import { View, ScrollView, Text, Image, MapView } from 'react-native';
import { MKButton } from 'react-native-material-kit'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

import Comment from '../components/comment'
import Styles, { COLORS, FULLHEIGHT } from '../styles'


// Grabbed from http://stackoverflow.com/questions/30606827/set-the-bounds-of-a-mapview
const earthRadiusInKM = 6371,
      radiusInKM = 1,
      aspectRatio = 1
const radiusInRad = radiusInKM / earthRadiusInKM;

class FloatingButtons extends Component {
  render(){
    return (
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
    )
  }
}
class InfoBlock extends Component {
  render() {
    return (
      <View>
        <Text>
          <Ionicons color={COLORS.BLACK} name="md-home" />
          &nbsp;&nbsp;&nbsp;
          {this.props.address}
        </Text>
        <Text>
          <Ionicons color={COLORS.BLACK} name="md-call" />
          &nbsp;&nbsp;&nbsp;
          {this.props.phone || "Not Provided"}
        </Text>
        <Text>
          <Ionicons color={COLORS.BLACK} name="md-globe" />
          &nbsp;&nbsp;&nbsp;
          {this.props.website || "Not Provided"}
        </Text>

      </View>

    )
  }
}
InfoBlock.propTypes = {
  address: React.PropTypes.string,
  phone: React.PropTypes.string,
  website: React.PropTypes.string
}

export default class BuildingDetails extends Component {

  deg2rad (angle) { return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
  }
  rad2deg (angle) { return angle * 57.29577951308232 // angle / Math.PI * 180
  }

  constructor(props){
    super(props);
    this.state = {
      building : null,
      comments : []
    }
  }
  componentDidMount() {
    fetch(`http://ratethisbuilding.com/api/comments?nid=${this.state.building.id}`)
    .then((response)=> response.json())
    .then((responseJSON)=> {
      this.setState({
        comments: responseJSON.comments
      })


    })
  }
  componentWillMount() {
    this.setState({
      building: this.props.building
    })
  }

  renderComments() {
    return (

      <ScrollView>
        {this.state.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment}></Comment>})
        }
      </ScrollView>

    )
  }
  render() {
    const { building } = this.state;
    if(!building){
      return (<View style={[Styles.container]}></View>)
    }
    else {
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
      return (
        <View style={[Styles.container]}>
          <ScrollView>
            <Image
              source={{uri: building.banner.src}}
              style={Styles.buildingBanner}
            />
            <View style={[{justifyContent: 'space-around', alignItems: 'stretch'}]}>

              {/* Titleblock */}
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={[{fontSize: 35}, Styles.headingsMargin]}
                minimumFontScale={0.7}
              >
                {building.title}
              </Text>

              {/* Infoblock */}
              <InfoBlock
                address={building.address}
                phone={building.phone}
                website={building.website} />

              {/* Map */}
              <MapView
                showsUserLocation={true}
                style={{height: 200}}
                region={buildingRegion}
                annotations={[buildingAnnotation]}
              />

              {/* // Comment section */}
              <Text style={[{fontSize: 25, fontFamily: 'Helvetica'}, Styles.headingsMargin]}>Comments</Text>
              <View style={{
                maxHeight: FULLHEIGHT * 0.4,
                backgroundColor: '#0D83FF22',
              }}>
                {this.renderComments()}
              </View>
              <MKButton
                backgroundColor={COLORS.THEME}
                style={[Styles.buildingDetailsFloatingButtonStyle]}
                onPress={() => {
                  Actions.addReview({building: building})
                }}
              >
                <Text style={{color: COLORS.WHITE}}>Review this building</Text>
              </MKButton>
            </View>
          </ScrollView>
          <FloatingButtons />
        </View>
      )
    }
  }
}
BuildingDetails.propTypes = {
  building: React.PropTypes.object
}
