import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, ScrollView, Text, Image, MapView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'

import SceneContainer from '../components/sceneContainer'
import { Button } from '../components/formItems'
import { Title } from '../components/typography'
import Comment from '../components/comment'
import InfoBlock from '../components/buildingDetails/infoBlock'
import { targetBuilding } from '../actions/buildings'
import Styles, { COLORS, FULLHEIGHT } from '../styles'

// TODO: Consider factoring the floating buttons out of this file
class FloatingButtons extends Component {
  render(){
    return (
      <View style={{
        justifyContent: 'space-around', flexDirection: 'row',
        marginTop: 5,
        position: 'absolute',
        left: 0,
        top: 0
      }}>
        <Button
          onPress={() => { console.log('Search Vacancy'); }}
          theme={1}
          buttonText={"Search Vacancy..."}
          style={{
            opacity: 0.8,
            margin: 0,
            flex: 1
          }}
        />
        <Button
          onPress={() => { console.log('List Now'); }}
          theme={2}
          buttonText={"List Now"}
          style={{
            opacity: 0.8,
            margin: 0,
            flex: 1
          }}
        />
      </View>
    )
  }
}



class BuildingDetails extends Component {

  static propTypes = {
    building: React.PropTypes.object,
    targetBuilding: React.PropTypes.func
  }

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
    // this.props.targetBuilding(this.state.building)
  }
  componentWillMount() {
    this.setState({
      building: this.props.building
    })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.review){
      // If there was a new review, do a refetch of the reviews
      fetch(`http://ratethisbuilding.com/api/comments?nid=${this.state.building.id}`)
      .then((response)=> response.json())
      .then((responseJSON)=> {
        this.setState({
          comments: responseJSON.comments
        })
      })
    }
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
      return (<SceneContainer />)
    }
    else {
      // Grabbed from http://stackoverflow.com/questions/30606827/set-the-bounds-of-a-mapview
      const earthRadiusInKM = 6371,
            radiusInKM = 1,
            aspectRatio = 1
      const radiusInRad = radiusInKM / earthRadiusInKM;

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
        <SceneContainer>
          <ScrollView bounces={false}>
            <Image
              source={{uri: building.banner.src}}
              style={Styles.buildingBanner}
            />
            <View style={[{justifyContent: 'space-around', alignItems: 'stretch'}]}>
              {/* Titleblock */}
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                style={[{fontSize: 35}, Styles.headingsMargin, Styles.appFontFamily]}
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
              <Title text={"Comments"} />
              <View style={{
                maxHeight: FULLHEIGHT * 0.4,
                backgroundColor: '#0D83FF22',
              }}>
                {this.renderComments()}
              </View>
              <Button
                onPress={() => {
                  if(this.props.user){
                    Actions.addReview({building: building})
                  }else{
                    Actions.auth()
                  }
                }}
                theme={1}
                buttonText={"Review Building"}
              />

              {/* <MKButton
                backgroundColor={COLORS.THEME}
                style={[Styles.buildingDetailsFloatingButtonStyle]}

                >
                <Text style={{color: COLORS.WHITE}}>Review this building</Text>
              </MKButton> */}
            </View>
          </ScrollView>
          {/* <FloatingButtons /> */}
        </SceneContainer>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    user: state.users.user,
    review: state.reviews.review
  }

}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    targetBuilding
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails)
