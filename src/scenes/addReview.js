import React, { Component } from 'react'
import { ScrollView, View, TextInput, Text } from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import { MKTextField } from 'react-native-material-kit'
import StarRating from 'react-native-star-rating'




import Styles from '../styles'



export default class AddReview extends Component {
  constructor(props){
    super(props)
    this.state = {
      subject: '',
      comments: '',
      rating: 0,
    }
  }

  render() {

    return (
      <ScrollView >
        <View style={Styles.container}>
          <Text style={{marginTop: 10, color: 'grey'}}>Subject</Text>
          <MKTextField
            style={{marginTop: 10, height: 40}}
            onTextChange={(e)=>{this.setState({subject:e})}}
            />
          <Text style={{marginTop: 10, color: 'grey'}}>Rating</Text>
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
          <Text style={{marginTop: 10, color: 'grey'}}>Comments</Text>
          <MKTextField
            multiline={true}
            style={{marginTop: 10, height: 100}}
            onTextChange={(e)=>{this.setState({comments:e});}}
            />

        </View>
      </ScrollView>
    );
  }
}
