import React, { Component } from 'react'
import { Text } from 'react-native'

import Styles from '../styles'

export class FormLabelText extends Component {
  render() {
    return (
      <Text style={Styles.formLabel}>{this.props.text}</Text>
    );
  }
}
FormLabelText.propTypes = {
  text: React.PropTypes.string.isRequired
}
