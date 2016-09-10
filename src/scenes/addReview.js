import React, { Component } from 'react'
import { View, TextInput, Text } from 'react-native'
import { MKTextField } from 'react-native-material-kit'

import Styles from '../styles'



export default class AddReview extends Component {
  constructor(props){
    super(props)
    this.getFormValues = this.getFormValues.bind(this);

    this.state = {
      subject: '',
      comments: '',
      rating: null,
    }
  }
  getFormValues(){

  }

  render() {

    const SubjectTextField = MKTextField.textfield()
      // .withPlaceholder('Subject')
      .withStyle({marginTop: 10, height: 40})
      .build();

    return (
      <View style={Styles.container}>
        <Text style={{marginTop: 10, color: 'grey'}}>Subject</Text>
        <SubjectTextField />
        <Text style={{marginTop: 10, color: 'grey'}}>Rating</Text>

        {/* <Form ref="form" type={Review}/>
        <TouchableHighlight onPress={this.getFormValues} underlayColor='#99d9f4'>
          <Text>Try me!</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}
