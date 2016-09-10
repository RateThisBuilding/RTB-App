import React, { Component } from 'react'
import { ScrollView, View, TextInput, Text, Image } from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import { MKTextField, MKButton } from 'react-native-material-kit'
import StarRating from 'react-native-star-rating'

import { Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import Styles from '../styles'

class FormLabelText extends Component {
  render() {
    return (
      <Text style={Styles.formLabel}>{this.props.text}</Text>
    );
  }
}

export default class AddReview extends Component {
  constructor(props){
    super(props)
    this.state = {
      subject: '',
      comments: '',
      rating: 0,
      images: []
    }
    this.openImagePicker = this.openImagePicker.bind(this)
  }

  openImagePicker() {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      images = images.map((image)=>({uri: image.path}))
      this.setState({ images })
    });
  }

  render() {
    let Images;
    if (this.state.images.length > 0){
      Images = this.state.images.map((image, i)=>(<Image source={image} key={i} style={Styles.selectedImageDimensions}/>))
    }else{
      Images = null
    }
    return (
      <View style={[Styles.container]}>
        <ScrollView>
          <Text style={Styles.formTitle}> {this.props.building.title} </Text>
          <FormLabelText text="Subject" />
          <MKTextField
            style={{marginTop: 10, height: 40}}
            onTextChange={(e)=>{this.setState({subject:e})}}
            />
          <FormLabelText text="Rating" />
          <View style={{marginTop: 10}}>
            <StarRating
              disable={false}
              maxStars={5}
              rating={this.state.rating}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              selectedStar={(rating) => {this.setState({rating: rating})}}
              starColor={'red'}
              emptyStarColor={'red'}
              />
          </View>
          <FormLabelText text="Comments" />
          <MKTextField
            multiline={true}
            style={{marginTop: 10, height: 100}}
            onTextChange={(e)=>{this.setState({comments:e});}}
            />
          <FormLabelText text="Images" />
          <View style={Styles.selectedImagesBarPreview}>{Images}</View>
          <MKButton
            backgroundColor={'#FF5555'}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            style={{ marginTop: 10, padding: 5 }}
            onPress={() => { this.openImagePicker(); }}
            >
            <Text pointerEvents="none"
              style={{color: 'white', fontWeight: 'bold',}}>
              ADD IMAGES
            </Text>
          </MKButton>
        </ScrollView>
        <View style={{justifyContent: 'flex-end'}}>
          <MKButton
            backgroundColor={'#0000FF'}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            style={{ marginTop: 10, padding: 5 }}
            onPress={() => { console.log(this.state);}}
            >
            <Text pointerEvents="none"
              style={{color: 'white', fontWeight: 'bold',}}>
              SUBMIT
            </Text>
          </MKButton>
        </View>
      </View>
    );
  }
}
