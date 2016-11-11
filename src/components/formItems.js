import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import {  MKButton, MKTextField } from 'react-native-material-kit'

import { COLORS }  from '../styles'

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
    buttonText: React.PropTypes.string,
    style: React.PropTypes.object,
  }
  static defaultProps = {
    style: {}
  }
  render() {
    return (
      <MKButton
        backgroundColor={this.props.theme === 2? COLORS.SECONDARY: COLORS.THEME}
        shadowColor="black"
        style={[styles.button, this.props.style]}
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

export class TextField extends Component {
  static propTypes = {
    multiline: React.PropTypes.bool,
    onTextChange: React.PropTypes.func,
    defaultText: React.PropTypes.string,
    password: React.PropTypes.bool,
    autoCapitalize: React.PropTypes.string

  }
  static defaultProps = {
    multiline: false,
    defaultText: "",
  }

  render() {
    return (
      <MKTextField
        multiline={this.props.multiline}
        style={this.props.multiline? styles.multiLineInputStyle : styles.textInputStyle}
        textInputStyle={{fontFamily: 'Roboto'}}
        onTextChange={this.props.onTextChange}
        defaultValue={this.props.defaultText}
        password={this.props.password}
        autoCapitalize={this.props.autoCapitalize}
        {...this.props}
      />
    )
  }
}

const styles = StyleSheet.create({
  formLabel: {
    marginTop: 10,
    padding: 5,
    color: 'grey'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    alignSelf: 'stretch',
  },
  floatButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    flex: 1,
    // width: FULLWIDTH*.48,
    opacity: 0.8
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  textInputStyle: {
    marginTop: 10,
    height: 40,
    padding: 5
  },
  multiLineInputStyle: {
    marginTop: 10,
    height: 100,
    padding: 5
  }
})
