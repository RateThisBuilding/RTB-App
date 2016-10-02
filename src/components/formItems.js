import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import {  MKButton } from 'react-native-material-kit'

import Styles, { COLORS }  from '../styles'

export class FormLabelText extends Component {
  render() {
    return (
      <Text style={styles.formLabel}>{this.props.text}</Text>
    );
  }
}
FormLabelText.propTypes = {
  text: React.PropTypes.string.isRequired
}

export class Button extends Component {
  static propTypes = {
    onPress: React.PropTypes.func,
    theme: React.PropTypes.number, // Either the blue or Orange
    buttonText: React.PropTypes.string


  }
  render() {
    return (
      <MKButton
        backgroundColor={this.props.theme === 2? COLORS.SECONDARY: COLORS.THEME}
        shadowRadius={2}
        shadowOffset={{width:0, height:2}}
        shadowOpacity={.7}
        shadowColor="black"
        style={styles.button}
        onPress={this.props.onPress}
      >
        <Text pointerEvents="none"
          style={styles.buttonText}>
          {this.props.buttonText}
        </Text>
      </MKButton>

    )
  }
}

const styles = StyleSheet.create({
  formLabel: {
    marginTop: 10,
    padding: 5,
    color: 'grey'
  },
  button: { margin: 10, padding: 10, alignSelf: 'stretch' },
  buttonText: {color: 'white', fontWeight: 'bold', textAlign: 'center'}
})
