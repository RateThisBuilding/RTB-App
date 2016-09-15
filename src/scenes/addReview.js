import React, { Component } from 'react'
import { ScrollView, View, TextInput, Text, Image } from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import { MKTextField, MKButton } from 'react-native-material-kit'
import StarRating from 'react-native-star-rating'

import { Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import Styles, { COLORS } from '../styles'

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
      // TODO: Reorganize the elements here into smaller ones
      <View style={[Styles.container]}>
        <ScrollView>
          {/* Title */}
          <Text style={Styles.formTitle}> Review: {this.props.building.title} </Text>
          {/* Rating */}
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
              starColor={Styles.STAR}
              emptyStarColor={Styles.STAR}
              />
          </View>
          {/* Subject */}
          <FormLabelText text="Subject" />
          <MKTextField
            style={{marginTop: 10, height: 40}}
            onTextChange={(e)=>{this.setState({subject:e})}}
            />
          {/* Comments */}
          <FormLabelText text="Comments" />
          <MKTextField
            multiline={true}
            style={{marginTop: 10, height: 100}}
            onTextChange={(e)=>{this.setState({comments:e});}}
            />
          {/* Images */}
          <FormLabelText text="Images" />
          <View style={Styles.selectedImagesBarPreview}>{Images}</View>
          <MKButton
            backgroundColor={ COLORS.SECONDARY }
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            style={{ marginTop: 10, margin: 5, padding: 5 }}
            onPress={() => { this.openImagePicker(); }}
            >
            <Text pointerEvents="none"
              style={{color: 'white', fontWeight: 'bold',}}>
              ADD IMAGES
            </Text>
          </MKButton>
        </ScrollView>
        {/* Submit Button */}
        <View style={{justifyContent: 'flex-end', marginBottom: 5}}>
          <MKButton
            backgroundColor={COLORS.THEME}
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
