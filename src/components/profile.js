import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Styles from '../styles'

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {page: 'Profile'};
  }
  render() {
  return (
    <View style={Styles.container}>
      <Text> {this.state.page} </Text>
    </View>

  );
}
}
