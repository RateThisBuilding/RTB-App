import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image, Alert, StyleSheet } from 'react-native'
import { MKTextField } from 'react-native-material-kit'
import StarRating from 'react-native-star-rating'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker'

import SceneContainer from '../components/sceneContainer'
import { FormLabelText, Button, TextField } from '../components/formItems'
import { addReview } from '../actions/reviews'
import Styles, { COLORS } from '../styles'


class AddReview extends Component {

  static propTypes = {
      building: React.PropTypes.object,
      addReview: React.PropTypes.func,

  }

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

  updateFormVal(key, val){
    this.setState({
      [key] : val
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
      <SceneContainer>
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
          <TextField
            onTextChange={this.updateFormVal.bind(this,'subject')}
          />
          {/* Comments */}
          <FormLabelText text="Comments" />
          <TextField
            multiline
            onTextChange={this.updateFormVal.bind(this,'comments')}
          />
          {/* Images */}
          <FormLabelText text="Images" />
          <View style={Styles.selectedImagesBarPreview}>{Images}</View>
          <Button
            onPress={() => { this.openImagePicker(); }}
            theme={2}
            buttonText={"Add Images"}
          />

          {/* Submit Button */}
          <Button
            onPress={() => {
              const { subject, comments, rating, images } = this.state
              this.props.addReview({
                subject,
                comments,
                rating,
                images
              })
              // Alert.alert('Review added', 'Your review has been successfully added.')
              // Actions.pop()
            }}
            theme={1}
            buttonText={"Submit"}
          />
        </ScrollView>
      </SceneContainer>
    );
  }
}

const styles = StyleSheet.create({
  starPickerContainer: {margin: 10}
})

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addReview
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview)
