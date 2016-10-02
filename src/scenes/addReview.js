import React, { Component } from 'react'
import { ScrollView, View, Text, Image, Alert, StyleSheet } from 'react-native'
import { MKTextField, MKButton } from 'react-native-material-kit'
import StarRating from 'react-native-star-rating'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker'

import { FormLabelText, Button } from '../components/formItems'
import Styles, { COLORS } from '../styles'


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
    }).catch(e => {
      console.log(e);
    })
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
          <View style={styles.starPickerContainer}>
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
          <Button
            onPress={() => {
              this.openImagePicker();
            }}
            theme={2}
            buttonText={"Add Images"}
          />

          {/* Submit Button */}
          <Button
            onPress={() => {
              Alert.alert('Review added', 'Your review has been successfully added.')
              Actions.pop()
            }}
            theme={1}
            buttonText={"Submit"}
          />
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  starPickerContainer: {margin: 10}
})

AddReview.propTypes = {
  building: React.PropTypes.object
}
